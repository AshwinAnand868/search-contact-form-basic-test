"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import contactData from "../data.json";
import SearchResults from "./components/search-results";

// Define the schema for the form using Zod (including required lastName field)
const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"), // Last Name is required
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Contact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const SearchPage = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle search form submission
  const handleSearch = (formData: FormData) => {
    const filtered = data.filter((contact) =>
      Object.entries(formData).every(([key, value]) =>
        value ? contact[key as keyof Contact]?.toString().toLowerCase().includes(value.toLowerCase()) : true
      )
    );
    setFilteredData(filtered);
  };

  // Handle resetting the search filters
  const handleReset = () => {
    reset();
    setFilteredData(data); // Reset to all data when the form is cleared
  };

  // Handle contact selection and populate the form inputs
  const handleContactSelect = (contact: Contact) => {
    setValue("firstName", contact.firstName);
    setValue("lastName", contact.lastName);
    setValue("email", contact.email);
    setValue("phoneNumber", contact.phoneNumber);
    setValue("city", contact.city);
    setValue("state", contact.state);
    setValue("zipCode", contact.zipCode);
    setValue("address", contact.address);
  };

  useEffect(() => {
    // For demonstration purposes, let's populate data with some static contacts.
    setData(contactData);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="mx-auto p-4 max-w-5xl h-[100vh]">
      <h1 className="text-2xl font-semibold text-center mb-6">Contact Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit(handleSearch)} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName?.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              {...register("phoneNumber")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              {...register("city")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              id="state"
              type="text"
              {...register("state")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              id="zipCode"
              type="text"
              {...register("zipCode")}
              className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      <SearchResults data={filteredData} onContactSelect={handleContactSelect} />
      
    </div>
  );
};

export default SearchPage;

"use client";

import { canadianStates, OptionType } from "@/hardcoded-canadian-states";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [selectedOption, setSelectedOption] = useState<OptionType>(canadianStates[0]); // default selected option for state

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle search form submission
  const handleSearch = (formData: FormData) => {
    const filtered = data.filter((contact) =>
      Object.entries(formData).every(([key, value]) =>
        value
          ? contact[key as keyof Contact]
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : true
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
  const handleContactSelect = (checked: boolean, contact: Contact) => {
    if (checked) {
      setSelectedContact(contact);
      setValue("firstName", contact.firstName);
      setValue("lastName", contact.lastName);
      setValue("email", contact.email);
      setValue("phoneNumber", contact.phoneNumber);
      setValue("city", contact.city);
      setValue("state", contact.state);
      setValue("zipCode", contact.zipCode);
      setValue("address", contact.address);
    } else {
      setSelectedContact(null);
      reset();
    }
  };

  useEffect(() => {
    // For demonstration purposes, let's populate data with some static contacts.
    setData(contactData);
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="mx-auto p-4 max-w-7xl h-[100vh]">
      <h1 className="text-2xl font-semibold mb-6">Choose a contact</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit(handleSearch)} className="p-4 mb-6">
        <h1 className="text-lg font-semibold mb-2">Search for a contact</h1>

        <div className="block gap-y-4 lg:flex justify-between items-center lg:gap-x-60">
          <div className="space-y-4">
            <div className="space-y-4 md:flex md:gap-x-2 md:items-center md:space-y-0">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  <span className="text-red-500 mr-[2px]">*</span>Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className={`mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${
                      errors.lastName ? "border-red-500" : "border-neutral-300"
                    }`}
                />
                {/* {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName?.message}
                  </p>
                )} */}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="space-y-4 md:flex md:gap-x-2 md:items-center md:space-y-0">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  {...register("phoneNumber")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="mt-4 lg:mt-0">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
              <input
                id="address"
                type="text"
                {...register("address")}
                className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-4 md:flex md:gap-x-2 md:items-center md:space-y-0">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register("city")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectedOption}
                      options={canadianStates}
                      onChange={(option) => setSelectedOption(option!)}
                      className="px-4 py-2 w-[150px] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  type="text"
                  {...register("zipCode")}
                  className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="px-4 py-2 bg-white text-blue-500 rounded-md border border-gray-400 hover:text-blue-800"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white text-gray-600 rounded-md hover:text-gray-900 border border-gray-400"
          >
            Reset
          </button>
        </div>
      </form>

      <SearchResults
        data={filteredData}
        selectedContact={selectedContact}
        onContactSelect={handleContactSelect}
      />
    </div>
  );
};

export default SearchPage;

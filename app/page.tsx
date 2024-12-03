"use client";

import { canadianStates } from "@/hardcoded-canadian-states";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import contactData from "../data.json";
import { Input } from "./components/inputs/input";
import SearchResults from "./components/search-results";
import { FormData, formSchema } from "./lib/form-schema";
import { Contact } from "./lib/types";

const SearchPage = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
    setValue("state", null);
    setFilteredData(data); // Reset to all data when the form is cleared
  };

  // Handle contact selection and populate the form inputs
  const handleContactSelect = (checked: boolean, contact: Contact) => {
    if (checked) {
      setSelectedContact(contact);
      setValue("firstName", contact.firstName);
      setValue("lastName", contact.lastName);
      setValue("email", contact.email);
      setValue("dateOfBirth", contact.dateOfBirth);
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
              <Input label="First Name" id="firstName" register={register} />
              <Input
                label="Last Name"
                id="lastName"
                register={register}
                required
                error={errors.lastName?.message}
              />
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={
                          field.value ? dayjs(field.value, "YYYY-MM-DD") : null
                        }
                        onChange={(date) => {
                          const formattedValue = date
                            ? dayjs(date).format("YYYY-MM-DD")
                            : "";
                          field.onChange(formattedValue); // Update the form value
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="space-y-4 md:flex md:gap-x-2 md:items-center md:space-y-0">
              <Input
                id="email"
                label="Email"
                type="email"
                register={register}
              />
              <Input
                label="Phone Number"
                id="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="mt-4 lg:mt-0">
              <Input 
                label="Street Address"
                id="address"
                register={register}
              />
            </div>
            <div className="space-y-4 md:flex md:gap-x-2 md:items-center md:space-y-0">
              <Input label="City" id="city" register={register} />
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
                      value={
                        canadianStates.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      options={canadianStates}
                      onChange={(option) => {
                        field.onChange(option?.value); // Update the form's state
                      }}
                      className="px-4 py-2 w-[150px] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                />
              </div>
              <Input
                label="Zip Code"
                id="zipCode"
                register={register}
                error={errors.zipCode?.message}
              />
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

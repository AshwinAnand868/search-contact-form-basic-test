"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from "react";


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

interface SearchResultsProps {
  data: Contact[];
  selectedContact: Contact | null;
  onContactSelect: (checked: boolean, contact: Contact) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ data, selectedContact, onContactSelect }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-6 p-4">
      
      {/* Table for Displaying Search Results */}
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600"></th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">First Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Last Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date of Birth</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">City</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">State</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Zip Code</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
              // onClick={() => onContactSelect(contact)}
            >
              <td className="px-4 py-2 text-sm">
                <input
                    type="checkbox"
                    checked={selectedContact?.email === contact.email}
                    onChange={(e) => onContactSelect((e.target as HTMLInputElement).checked, contact)}
                    className="cursor-pointer"
                  />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {contact.firstName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {contact.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.dateOfBirth}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.address}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.city}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.state}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.zipCode}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button
          className={` text-blue-400 rounded-md shadow-sm hover:text-blue-700 focus:outline-none disabled:text-gray-400`}
          disabled={currentPage === 1 || data.length === 0}
          onClick={() => paginate(currentPage - 1)}
        >
          <ChevronLeft className="w-8 h-8"/>
        </button>
        <span className="self-center py-3 px-6 bg-blue-400 text-white">
          {currentPage}
        </span>
        <button
          className=" text-blue-400 rounded-md shadow-sm hover:text-blue-700 focus:outline-none disabled:text-gray-400"
          disabled={currentPage === totalPages || data.length === 0}
          onClick={() => paginate(currentPage + 1)}
        >
          <ChevronRight className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default SearchResults;

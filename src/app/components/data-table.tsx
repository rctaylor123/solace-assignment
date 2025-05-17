import React from 'react';
import { Advocate } from '@/app/types/advocate';
import Spinner from './spinner';

interface DataTableProps {
  filteredAdvocates: Array<Advocate>;
  isLoading: boolean;
}

export default function DataTable({ filteredAdvocates, isLoading }: DataTableProps) {
  const tableHeaders = [
    'First Name',
    'Last Name',
    'City',
    'Degree',
    'Specialties',
    'Years of Experience',
    'Phone Number'
  ];

  if (isLoading) {
    return (
      <div className='m-5 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          {tableHeaders.map((header: string, i: number) => (
            <th key={i} scope='col' className='px-6 py-3 text-start'>
              <div className='flex items-center gap-x-2'>
                <span className='text-xs font-semibold text-gray-800 uppercase'>{header}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className='divide-y divide-gray-200'>
        {filteredAdvocates.map((advocate, i) => {
          return (
            <tr key={i}>
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                <ul className='list-disc space-y-2 ps-5 text-sm text-gray-600 marker:text-green-800'>
                  {advocate.specialties.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className='size-px whitespace-nowrap'>
      <div className='px-6 py-2'>
        <div className='flex items-center gap-x-2'>
          <div className='grow'>
            <span className='text-sm text-gray-600'>{children}</span>
          </div>
        </div>
      </div>
    </td>
  );
}

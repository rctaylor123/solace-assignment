import React from 'react';

interface DataTableProps {
    filteredAdvocates: Array<Record<string, any>>;
    isLoading: boolean;
}

function DataTable({ filteredAdvocates, isLoading }: DataTableProps) {
    return (
        <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr key={i}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s: string, i: number) => (
                    <div key={i}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default DataTable;
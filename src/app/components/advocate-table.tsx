import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search-bar";
import DataTable from "@/app/components/data-table";
import { Advocate } from "@/app/types/advocate";


function AdvocateTable() {
    const [advocates, setAdvocates] = useState([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState([]);
    let [searchText, setSearchText] = useState("");

    useEffect(() => {
        console.log("fetching advocates...");
        fetch("/api/advocates").then((response) => {
            response.json().then((jsonResponse) => {
                setAdvocates(jsonResponse.data);
                setFilteredAdvocates(jsonResponse.data);
            });
        });
    }, []);

    const filterAdvocates = (search: string) => {
        setSearchText(search);

        if (!search) {
            setFilteredAdvocates(advocates);
            return;
        }

        console.log("filtering advocates... " + search);
        const filteredAdvocates = advocates.filter((advocate: Advocate) => {
            return (
                advocate.firstName.includes(search) ||
                advocate.lastName.includes(search) ||
                advocate.city.includes(search) ||
                advocate.degree.includes(search) ||
                advocate.specialties.includes(search) ||
                advocate.yearsOfExperience.toString().includes(search)
            );
        });

        setFilteredAdvocates(filteredAdvocates);
    };

    const clearFilter = () => {
        setSearchText("");
        setFilteredAdvocates(advocates);
    };

    return (
        <main>
            <h1>Solace Advocates</h1>
            <SearchBar
                searchText={searchText}
                handleSearch={filterAdvocates}
                handleClearFilter={clearFilter}
            />
            <DataTable
                filteredAdvocates={filteredAdvocates}
                isLoading={false}
            />
        </main>
    );
}

export default AdvocateTable;
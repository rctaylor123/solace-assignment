I went ahead and merged my PRs because they build on one another, but they are still viewable in the closed section. 

Some things I would address with more time:

### Filtering
The filtering setup is not going to scale well over time. Larger datasets will take longer to search if we're doing an ilike on each field in the table. Short term, we'd want to add GIN indexes to the fields we're searching on. More indexes will increase overall storage space and data insertion time, but will be more performant for reads.

Longer term, I'd want to be more intentional with the filtering options. Building out a filter menu would allow us to build more specific queries. We'd still want indexes, but searching on 1-2 fields (in more cases) instead of all fields would be more efficient. You could also look into caching or elasticsearch layers, but postgres should be able to handle most use cases on its own. I would prefer to not add additional complexity until we feel postgres can no longer serve our needs.

Postgres full text search is also an option and could potentially add fuzzy search options, but fuzzy search can add confusion for users looking for exact matches, so some product studies would need to be done to determine what works best for users.

I also did not add sorting options (aside from a default lastName, firstName sort) and would like to have that in a final product.

### Styling
On the styling side, I would have liked to add some more styles to the search box. In particular, I would add a search or filter icon to the box (before the placeholder) and a clear icon when there is an active search.

The pagination component in its current state will also not grow well. I don't have a limit on the pages shown, so I would need to add logic to have it show a rolling set of pages (showing only 3-5 pages at a time) and add links to go to the first and last page.

Advocates can have a varying amount of specialties, which can make the table look a bit clunky. I would add some logic to limit the amount that we display intially with the overflow going to a "See more" badge that indicates how many more are available. Clicking the badge would display all specialties for the selected advocate.

I would also work on building out a component library for a larger project to promote component reuse and prevent duplicating styles.

### Misc
From a data structure perspective, I would split specialties out to a different table. This would give us a standard list of specialties and allow a many-to-many relationship with advocates.
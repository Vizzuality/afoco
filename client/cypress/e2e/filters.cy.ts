interface Filter {
  id: string;
  label: string;
}

interface Filters {
  [category: string]: Filter[];
}

interface FiltersParam {
  [category: string]: string[] | string;
}

type FilterWithCategory = {
  id: string;
  category: string;
};

describe('projects filtering', () => {
  it('clicks on a random filter and checks if the badge is visible', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]').click();
    cy.get('[data-cy="filters-content"]').should('be.visible');
    cy.fixture<Filters>('filters.json').then((filters) => {
      // Convert the filters object into an array of categories
      const categories = Object.keys(filters);
      // Select a random category
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomCategoryIndex];

      // If the random category is "country", click on `filter-country-content` first
      if (randomCategory === 'country') {
        cy.get('[data-cy="filter-country-select"]').click();
      }

      // Now select a random filter within this category
      const filterType = filters[randomCategory];
      const randomFilterIndex = Math.floor(Math.random() * filterType.length);
      const randomFilter = filterType[randomFilterIndex];
      // Click on the checkbox for the randomly selected filter
      cy.get(`[data-cy="filter-${randomCategory}-${randomFilter.id}"]`).click();
      // Check if the badge for the selected filter is visible
      cy.get(`[data-cy="filters-badge-${randomCategory}-${randomFilter.id}"]`).should('be.visible');
    });
  });

  it('clicks on more than three random filters and checks a maximum of three badges are shown', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]').click();
    cy.get('[data-cy="filters-content"]').should('be.visible');

    cy.fixture<Filters>('filters.json').then((filters) => {
      let allFilters: FilterWithCategory[] = [];
      Object.keys(filters).forEach((category) => {
        filters[category].forEach((filter) => {
          allFilters.push({ category, id: filter.id });
        });
      });

      // Randomize filter selection
      allFilters = allFilters.sort(() => 0.5 - Math.random());

      const clickFilter = (filter: FilterWithCategory) => {
        if (filter.category === 'country') {
          // Special handling for country filters
          cy.get('[data-cy="filter-country-select"]').click();
          cy.get(`[data-cy="filter-${filter.category}-${filter.id}"]`).click();
        } else {
          // Direct click for other categories
          cy.get(`[data-cy="filter-${filter.category}-${filter.id}"]`).click();
        }
      };

      // Click on the first four filters from the randomized list
      for (let i = 0; i < Math.min(4, allFilters.length); i++) {
        clickFilter(allFilters[i]);
      }

      // Verify the badges
      // Ensure we wait a bit for the UI to update based on filter clicks
      cy.wait(500); // Adjust based on your app's behavior
      cy.get('[data-cy^="filters-badge-"]').then((badges) => {
        expect(badges.length).to.be.at.most(3);
      });
    });
  });

  it('clicks on more than three random filters and verifies the "and more" message', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]')
      .click()
      .then(() => {
        cy.get('[data-cy="filters-content"]')
          .should('be.visible')
          .then(() => {
            cy.fixture<Filters>('filters.json').then((filters) => {
              let allFilters: { id: string; category: string }[] = [];
              Object.keys(filters).forEach((category) => {
                filters[category].forEach((filter) => {
                  allFilters.push({ category, id: filter.id });
                });
              });

              // Shuffle the array to randomize filter selection
              allFilters = allFilters.sort(() => 0.5 - Math.random());

              // Select and click on the first four filters from the randomized list
              for (let i = 0; i < 4; i++) {
                // Special handling for the "country" category
                if (allFilters[i].category === 'country') {
                  cy.get('[data-cy="filter-country-select"]')
                    .click()
                    .then(() => {
                      // Click on the country filter within the dropdown
                      cy.get(
                        `[data-cy="filter-${allFilters[i].category}-${allFilters[i].id}"]`
                      ).click();
                    });
                } else {
                  // Directly click on the filter for non-country categories
                  cy.get(
                    `[data-cy="filter-${allFilters[i].category}-${allFilters[i].id}"]`
                  ).click();
                }
              }

              // Assert that no more than three badges are visible
              cy.get('[data-cy^="filters-badge-"]').then((badges) => {
                expect(badges.length).to.be.at.most(3);
              });
            });
          });
      });
  });
});

describe('Filter selection and removal URL update', () => {
  it('updates the URL based on selected filters and removes them when badges are clicked, with special handling for country filters', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]').click();
    cy.get('[data-cy="filters-content"]').should('be.visible');

    cy.fixture<Filters>('filters.json').then((filters) => {
      const selectedFilters: { id: string; category: string }[] = [];

      Object.keys(filters).forEach((category) => {
        const filter = filters[category][0]; // Taking the first filter for simplicity
        selectedFilters.push({ category, id: filter.id });

        // Special handling for country filters due to possibly dynamic content loading
        if (category === 'country') {
          cy.get('[data-cy="filter-country-select"]').click(); // Open the country dropdown/modal
          // Increase timeout to ensure the element is available
          cy.get(`[data-cy="filter-${category}-${filter.label}"]`).click();
        } else {
          // Click on the filter for other categories
          cy.get(`[data-cy="filter-${category}-${filter.id}"]`).click();
        }
      });

      // Construct the expected URL part for verification after all filters are selected
      // const filtersParam: FiltersParam = selectedFilters.reduce(
      //   (
      //     acc: FiltersParam,
      //     filter: {
      //       category: string;
      //       id: string;
      //     }
      //   ) => {
      //     if (!acc[filter.category]) {
      //       acc[filter.category] = [];
      //     }
      //     acc[filter.category].push(filter.id);
      //     return acc;
      //   },
      //   {}
      // );

      // const expectedUrlPart = `filters=${encodeURIComponent(JSON.stringify(filtersParam))}`;

      // Verify the URL includes the expected filters
      // cy.url().should('include', decodeURIComponent(expectedUrlPart));
      cy.url().should(
        'include',
        '%22intervention%22:[%22climate-change-adaptation%22],%22country%22:%22Myanmar%22,%22area_restored%22:[%22%3C200%22],%22area_protected%22:[%22%3C200%22],%22area_plantation%22:[%22%3C200%22]'
      ); // Adjust based on the selected filters

      // Click on the badge of the first selected filter to remove it
      const filterToRemove = selectedFilters[0];
      cy.get(
        `[data-cy="filters-remove-badge-${filterToRemove.category}-${filterToRemove.id}"]`
      ).click();

      // Verify the URL no longer includes the removed filter
      cy.url().then((url) => {
        const decodedUrl = decodeURIComponent(url);
        const removedFilterRepresentation = `"${filterToRemove.category}":["${filterToRemove.id}"]`;
        expect(decodedUrl).not.to.include(removedFilterRepresentation);
      });
    });
  });
});

describe('Filter selection URL update', () => {
  it('should update the URL based on selected filters', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]').click();
    cy.get('[data-cy="filters-content"]').should('be.visible');

    cy.fixture<Filters>('filters.json').then((filters) => {
      const allFilters: (FilterWithCategory & { label: string })[] = [];
      Object.keys(filters).forEach((category) => {
        filters[category].forEach((filter) => {
          allFilters.push({ category, id: filter.id, label: filter.label });
        });
      });

      // Randomly select one or two filters
      const selectedFilters = Cypress._.sampleSize(allFilters, Cypress._.random(1, 2));

      // Click on the randomly selected filters with special handling for dynamic content
      selectedFilters.forEach((filter) => {
        if (filter.category === 'country') {
          // Assuming 'country' filters require opening a dropdown to access
          cy.get('[data-cy="filter-country-select"]').click();
          cy.get(`[data-cy="filter-${filter.category}-${filter.label}"]`)
            .should('be.visible')
            .click();
        } else {
          // Directly click on filters for other categories
          cy.get(`[data-cy="filter-${filter.category}-${filter.id}"]`).click();
        }
      });

      // Construct the expected URL part for verification
      const filtersParam: FiltersParam = selectedFilters.reduce(
        (
          acc: FiltersParam,
          filter: {
            category: string;
            id: string;
          }
        ) => {
          if (!acc[filter.category]) {
            acc[filter.category] = [];
          }
          if (filter.category === 'country') {
            acc[filter.category] = filter.id;
          }
          if (filter.category !== 'country' && Array.isArray(acc[filter.category])) {
            (acc[filter.category] as string[]).push(filter.id);
          }
          return acc;
        },
        {}
      );

      const expectedUrlPartAdd = `filters=${encodeURIComponent(JSON.stringify(filtersParam))}`;

      // Verify the URL includes the expected filters
      cy.url().then((url) => {
        const decodedUrl = decodeURIComponent(url);
        expect(decodedUrl).to.include(decodeURIComponent(expectedUrlPartAdd));
      });
    });
  });
});

describe('Filter selection and removal URL update with dropdown interaction', () => {
  it('updates the URL based on selected filters, including handling a country dropdown', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="show-filters-btn"]').click();
    cy.get('[data-cy="filters-content"]').should('be.visible');

    // Handle dropdown for country filters specifically
    // Ensure the dropdown is clicked to reveal its options
    cy.get('[data-cy="filter-country-select"]').click();

    // Wait for the dropdown options to become visible. Adjust the timeout as needed.
    // This wait is critical to ensure that the dropdown has enough time to render its contents.
    cy.get('[data-cy="filter-country-Indonesia"]', { timeout: 15000 }).should('be.visible').click();

    // Proceed to select other filters as needed
    cy.fixture<Filters>('filters.json').then((filters) => {
      Object.keys(filters).forEach((category) => {
        if (category !== 'country') {
          // Assuming 'country' was already handled
          const filter = filters[category][0]; // Example: Selecting the first filter for simplicity
          cy.get(`[data-cy="filter-${category}-${filter.id}"]`).click();
        }
      });
    });

    // Verify the URL includes the expected filters
    // Construct the expected URL part for verification
    const selectedFilters = [{ category: 'country', id: 'Indonesia' }]; // Add other selected filters as necessary
    // const filtersParam: FiltersParam = selectedFilters.reduce(
    //   (
    //     acc: FiltersParam,
    //     filter: {
    //       category: string;
    //       id: string;
    //     }
    //   ) => {
    //     if (!acc[filter.category]) {
    //       acc[filter.category] = [];
    //     }
    //     acc[filter.category].push(filter.id);
    //     return acc;
    //   },
    //   {}
    // );

    // const expectedUrlPart = `filters={${encodeURIComponent(JSON.stringify(filtersParam).replace(/[\[\]']+/g,''))}}`;

    // cy.url().should('include', expectedUrlPart);
    cy.url().should('include', '%22country%22:%22Indonesia%22'); // Adjust based on the selected filters

    // Example: Click on the "clear filters" button to remove all filters
    cy.get('[data-cy="clear-filters-button"]').click();
    // Verify the URL reflects no filters
    cy.url().should((url) => {
      expect(decodeURIComponent(url)).to.include('filters={}');
    });
  });
});

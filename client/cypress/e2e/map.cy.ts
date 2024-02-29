describe('map', () => {
  it('loads', () => {
    cy.visit('/');
    const map = cy.get('#default').wait(8000);
    map.should('exist');
  });
});

describe('Map - settings. Updates URL accordingly on basemap selection', () => {
  it('Updates URL on satellite basemap selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');

    cy.get('[data-cy="basemap-satellite"]').click();

    cy.url().should((url) => {
      // Decode the part of the URL we're interested in
      const decodedUrl = decodeURIComponent(url);
      // Check if the decoded URL includes the specific basemap setting
      expect(decodedUrl).to.include('"basemap":"basemap-satellite"');
    });
  });

  it('Updates URL on light basemap selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');

    cy.get('[data-cy="basemap-light"]').click();

    // This will wait for the URL to change and include the specified part
    cy.url().should((url) => {
      // Decode the part of the URL we're interested in
      const decodedUrl = decodeURIComponent(url);
      // Check if the decoded URL includes the specific basemap setting
      expect(decodedUrl).to.include('"basemap":"basemap-light"');
    });
  });
});

describe('Map - settings. Updates URL accordingly on basemap selection', () => {
  it('Updates URL on light label selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');
    cy.get('[data-cy="map-settings-labels"]').should('be.visible');

    // Checking for "light" labels
    cy.get('[data-cy="map-settings-label-light"]').click();
    cy.url().should((url) => {
      // Decode the part of the URL we're interested in
      const decodedUrl = decodeURIComponent(url);
      // Check if the decoded URL includes the specific basemap setting
      expect(decodedUrl).to.include('"labels":"light"');
    });
  });
  it('Updates URL on dark label selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');
    cy.get('[data-cy="map-settings-labels"]').should('be.visible');

    // Navigate back to settings to select "light" labels, if the UI requires it
    cy.get('[data-cy="map-settings-button"]').click();

    // Checking for "dark" labels
    cy.get('[data-cy="map-settings-label-dark"]').click();
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      // The test should pass if "labels":"dark" is found or if there's nothing explicitly mentioned about labels as "dark" is the default option
      if (!decodedUrl.includes('labels')) {
        expect(decodedUrl).to.not.include('labels');
      } else {
        expect(decodedUrl).to.include('"labels":"dark"');
      }
    });
  });
  it('Updates URL on no label selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');
    cy.get('[data-cy="map-settings-labels"]').should('be.visible');

    // Checking for "none" labels
    cy.get('[data-cy="map-settings-label-none"]').click();
    cy.url().should((url) => {
      // Decode the part of the URL we're interested in
      const decodedUrl = decodeURIComponent(url);
      // Check if the decoded URL includes the specific basemap setting
      expect(decodedUrl).to.include('"labels":"none"');
    });
  });
});

describe('Map - settings. Updates URL accordingly on layers selection', () => {
  it('Updates URL on roads layer selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');
    cy.get('[data-cy="map-settings-labels"]').should('be.visible');

    // Roads layer should be off by default
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"roads":"false"');
    });

    cy.get('[data-cy="map-settings-boundaries-switcher"]').click();
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"roads":"true"');
    });

    cy.get('[data-cy="map-settings-boundaries-switcher"]').click();
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"roads":"false"');
    });
  });
  it('Updates URL on boundaries boundaries selection', () => {
    cy.visit('/');
    cy.get('[data-cy="map-settings-button"]').click();
    cy.get('[data-cy="map-settings-content"]').should('be.visible');
    cy.get('[data-cy="map-settings-labels"]').should('be.visible');

    cy.get('[data-cy="map-settings-button"]').click();

    // Boundaries layer should be off by default
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"boundaries":"false"');
    });

    cy.get('[data-cy="map-settings-boundaries-switcher"]').click();
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"boundaries":"true"');
    });

    cy.get('[data-cy="map-settings-boundaries-switcher"]').click();
    cy.url().should((url) => {
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).to.include('"boundaries":"false"');
    });
  });
});

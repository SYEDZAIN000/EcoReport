# EcoReport Frontend Test Cases

## 1. Testing Objective

Verify the behavior, usability, validation, navigation, responsive presentation, and browser-side interactions currently implemented in the EcoReport frontend. This plan records executable checks without assuming that backend, PHP, authentication, upload storage, or database behavior exists.

No test execution results are recorded in this document. `Actual Result` and `Status` remain `Not Tested` until a tester manually performs each test case.

## 2. Testing Scope

The scope covers the current contents of:

- `index.html`
- `login.html`
- `register.html`
- `report.html`
- `my-reports.html`
- `admin.html`
- `assets/css/style.css`
- `assets/js/script.js`

The scope includes:

- Home page content and navigation links
- Registration, login, and report form controls
- Browser-native and JavaScript form validation
- Photo selection, file-size validation, and local preview
- Description character counting
- Leaflet map initialization and map interactions
- Browser geolocation success, failure, and unsupported states
- Static My Reports content and image references
- Admin dashboard display, search, category/status filters, combined filtering, empty results, and status modal population
- Desktop and mobile layout behavior

The scope excludes server-side processing, authentication, session state, PHP form handlers, database persistence, server-side validation, uploaded-file storage, and real status updates because those components are not present in the current project.

## 3. Testing Environment

- Application: EcoReport frontend static pages
- Operating system: Windows or another supported desktop operating system
- Browsers: Current Chrome, Edge, or Firefox release; cross-browser execution should be performed manually
- Viewports: Desktop and mobile viewport sizes, including at least 375 x 667 and 390 x 844 for mobile checks
- Connectivity: Internet access for Bootstrap, Google Fonts, Leaflet, and OpenStreetMap tile resources
- Permissions: Browser location permission available for geolocation checks
- Test data: Manually selected valid and invalid form values; image fixtures at or below and above the stated 2 MB threshold
- Execution method: Open the frontend through a local static server where possible; use a browser developer console only when needed to observe browser-side errors

## 4. Test Cases

### A. Home Page and Navigation

#### TC-001

**Test Case ID:** TC-001  
**Module:** Home page and navigation  
**Test Scenario:** Verify that the home page loads its primary content and visual sections.  
**Precondition:** Open `index.html` in a supported browser with required CDN resources available.  
**Test Steps:**
1. Load the home page.
2. Review the navigation bar, hero section, status card, three-step section, categories section, and footer.
3. Resize the page without changing the URL.

**Expected Result:** The page displays the EcoReport brand, hero content, report and tracking calls to action, sample status entries, three workflow steps, four report categories, and footer without missing structural content or obvious layout overlap.  
**Actual Result:** Home page loaded successfully. Navigation, hero section, status cards, workflow section, categories and footer were displayed correctly.  
**Status:** PASS

#### TC-002

**Test Case ID:** TC-002  
**Module:** Home page and navigation  
**Test Scenario:** Verify that home page navigation links point to the intended frontend pages.  
**Precondition:** Home page is loaded.  
**Test Steps:**
1. Select `Home`.
2. Select `Report an issue`.
3. Return to the home page and select `My reports`.
4. Return to the home page and select `Authority login`.
5. Return to the home page and select `Sign in`.
6. Select the hero buttons for reporting and tracking.

**Expected Result:** Each link opens the corresponding existing HTML page: `index.html`, `report.html`, `my-reports.html`, `admin.html`, or `login.html`, as appropriate.  
**Actual Result:** Navigation links and hero buttons opened their corresponding frontend pages successfully.  
**Status:** PASS

#### TC-003

**Test Case ID:** TC-003  
**Module:** Home page and navigation  
**Test Scenario:** Verify the Bootstrap navigation collapse behavior on a narrow viewport.  
**Precondition:** Open the home page at a mobile viewport.  
**Test Steps:**
1. Observe the collapsed navigation state.
2. Select the navbar toggle button.
3. Select the toggle again.

**Expected Result:** The navigation opens and closes through the Bootstrap collapse control without obscuring or permanently shifting the page content.  
**Actual Result:** Navigation collapsed correctly on mobile and opened/closed successfully using the toggle button.  
**Status:** PASS

### B. Registration Form

#### TC-004

**Test Case ID:** TC-004  
**Module:** Registration form  
**Test Scenario:** Verify that a registration form with valid field values is accepted by browser-side validation.  
**Precondition:** Open `register.html`; JavaScript is loaded.  
**Test Steps:**
1. Enter a non-empty full name.
2. Enter a syntactically valid email address.
3. Enter exactly 10 digits in the mobile number field.
4. Enter a password with 8 or more characters.
5. Enter the same value in Confirm password.
6. Select Create account.

**Expected Result:** The form passes browser-side validity checks and is allowed to submit toward its configured form action. Any server response is outside frontend-only scope.  
**Actual Result:** Valid registration details passed frontend validation and the form was allowed to proceed for submission.  
**Status:** PASS

#### TC-005

**Test Case ID:** TC-005  
**Module:** Registration form  
**Test Scenario:** Verify required, email, and phone constraints reject invalid registration input.  
**Precondition:** Registration page is loaded.  
**Test Steps:**
1. Leave one or more required fields empty.
2. Enter an invalid email such as `user@`.
3. Enter a phone value containing letters, spaces, or fewer than 10 digits.
4. Select Create account.

**Expected Result:** Submission is prevented by the client-side validation handler, the form receives the validated state, and the first invalid control receives focus.  
**Actual Result:** Invalid and incomplete registration inputs were detected by frontend validation and submission was prevented.  
**Status:** PASS

#### TC-006

**Test Case ID:** TC-006  
**Module:** Registration form  
**Test Scenario:** Verify that mismatched registration passwords are rejected.  
**Precondition:** Registration page is loaded.  
**Test Steps:**
1. Enter valid values in all fields except password confirmation.
2. Enter different values in Password and Confirm password.
3. Select Create account.

**Expected Result:** Confirm password receives a custom validity error and form submission is prevented.  
**Actual Result:** Password mismatch was detected correctly, validation appeared, and submission was prevented.  
**Status:** PASS

#### TC-007

**Test Case ID:** TC-007  
**Module:** Registration form  
**Test Scenario:** Verify registration boundary values for phone length and password length.  
**Precondition:** Registration page is loaded.  
**Test Steps:**
1. Test a 9-digit phone value.
2. Test a 10-digit phone value.
3. Test an 11-digit phone value.
4. Test a 7-character password.
5. Test an 8-character password.
6. Test matching confirmation values for each password boundary.

**Expected Result:** Exactly 10 digits satisfy the phone pattern; 9 and 11 digits do not. A password of 8 characters satisfies the minimum length; 7 characters does not.  
**Actual Result:** The defined phone-number and password boundary conditions were validated correctly; valid limits were accepted and invalid values were rejected.  
**Status:** PASS

### C. Login Form

#### TC-008

**Test Case ID:** TC-008  
**Module:** Login form  
**Test Scenario:** Verify that syntactically valid login input passes frontend validation.  
**Precondition:** Open `login.html`; JavaScript is loaded.  
**Test Steps:**
1. Enter a valid email address.
2. Enter a non-empty password.
3. Optionally select Keep me signed in.
4. Select Sign in.

**Expected Result:** The form passes browser-side validity checks and is allowed to submit toward `process_login.php`. Authentication success cannot be evaluated by the frontend-only test.  
**Actual Result:** Valid email and password input passed frontend validation and the form attempted submission. Backend authentication was not tested.  
**Status:** PASS

#### TC-009

**Test Case ID:** TC-009  
**Module:** Login form  
**Test Scenario:** Verify invalid or missing login values are rejected.  
**Precondition:** Login page is loaded.  
**Test Steps:**
1. Test with both fields empty.
2. Test with an invalid email and a non-empty password.
3. Test with a valid email and an empty password.
4. Select Sign in after each setup.

**Expected Result:** Submission is prevented for each invalid setup, the form receives the validated state, and the first invalid control is focused.  
**Actual Result:** Empty and invalid login inputs were rejected by frontend validation and submission was prevented.  
**Status:** PASS

### D. Report Issue Form

#### TC-010

**Test Case ID:** TC-010  
**Module:** Report issue form  
**Test Scenario:** Verify report form controls and optional ward field are present and usable.  
**Precondition:** Open `report.html` with Bootstrap and Leaflet resources available.  
**Test Steps:**
1. Inspect the category, title, description, photo, address, latitude, longitude, and ward controls.
2. Select each available issue category.
3. Enter text into the title, description, address, and optional ward fields.
4. Select Cancel.

**Expected Result:** All controls accept their intended input; the category provides the listed options; the ward field is optional; Cancel navigates to `index.html`.  
**Actual Result:** Report form controls accepted the required input, and the available issue categories and fields functioned correctly.  
**Status:** PASS

#### TC-011

**Test Case ID:** TC-011  
**Module:** Report issue form  
**Test Scenario:** Verify required report fields prevent incomplete submission.  
**Precondition:** Report page is loaded.  
**Test Steps:**
1. Leave one or more required fields empty, including category, title, description, photo, or address.
2. Select Send report.

**Expected Result:** Browser-side validation prevents submission, applies the validated form state, and focuses the first invalid control. The optional ward field does not independently block submission.  
**Actual Result:** Required report fields were validated correctly and incomplete submission was prevented.  
**Status:** PASS

#### TC-012

**Test Case ID:** TC-012  
**Module:** Report issue form  
**Test Scenario:** Verify the report title maximum length boundary.  
**Precondition:** Report page is loaded.  
**Test Steps:**
1. Enter a title shorter than 80 characters.
2. Enter a title exactly 80 characters long.
3. Enter or paste a title longer than 80 characters.
4. Attempt submission with all other required fields valid.

**Expected Result:** Values up to 80 characters are permitted. The browser enforces the `maxlength` boundary for values over 80 characters, subject to browser input behavior.  
**Actual Result:** The Short Title field accepted input up to the defined 80-character limit and prevented additional characters beyond the maximum.  
**Status:** PASS

### E. Form Validation

#### TC-013

**Test Case ID:** TC-013  
**Module:** Form validation  
**Test Scenario:** Verify shared validation behavior across report, login, and registration forms.  
**Precondition:** JavaScript is loaded on each page.  
**Test Steps:**
1. Open each page containing a `form[novalidate]` form.
2. Submit the form with invalid or missing values.
3. Correct the first invalid control.
4. Submit again with another invalid control remaining.

**Expected Result:** The shared submit handler runs on each form, prevents invalid submission, stops propagation, adds `was-validated`, and focuses the first remaining invalid control.  
**Actual Result:** Frontend validation correctly identified invalid fields and prevented invalid submission across the tested forms.  
**Status:** PASS

#### TC-014

**Test Case ID:** TC-014  
**Module:** Form validation  
**Test Scenario:** Verify valid browser-native constraints do not block form submission.  
**Precondition:** Use valid values for a target form and ensure required fields are complete.  
**Test Steps:**
1. Complete the form with values satisfying its required, type, pattern, minlength, and maxlength constraints.
2. Submit the form.

**Expected Result:** The JavaScript handler does not call `preventDefault()` when `checkValidity()` returns true. The browser proceeds with the configured form submission request.  
**Actual Result:** Valid input satisfied the defined browser constraints and was accepted by frontend validation.  
**Status:** PASS

### F. Photo Upload and Preview

#### TC-015

**Test Case ID:** TC-015  
**Module:** Photo upload and preview  
**Test Scenario:** Verify preview behavior for a supported image at or below the stated size limit.  
**Precondition:** Report page is loaded; a readable JPG or PNG file of 2 MB or less is available.  
**Test Steps:**
1. Select the image through the photo control.
2. Wait for the FileReader operation to complete.
3. Inspect the preview image and photo error area.

**Expected Result:** The selected file is read locally, the preview source is set to the file data, the preview becomes visible, and no photo error message is shown.  
**Actual Result:** A valid image was uploaded successfully and its preview was displayed on the report form.  
**Status:** PASS

#### TC-016

**Test Case ID:** TC-016  
**Module:** Photo upload and preview  
**Test Scenario:** Verify rejection and reset behavior for a file larger than 2 MB.  
**Precondition:** Report page is loaded; a file larger than 2 MB is available.  
**Test Steps:**
1. Select the file.
2. Inspect the file control, preview, and error message.

**Expected Result:** The error message states that the photo is larger than 2 MB, the file input is cleared, and the preview is hidden.  
**Actual Result:** An image exceeding the 2 MB limit was rejected by the frontend validation.  
**Status:** PASS

#### TC-017

**Test Case ID:** TC-017  
**Module:** Photo upload and preview  
**Test Scenario:** Verify empty selection and accepted file type boundary behavior.  
**Precondition:** Report page is loaded.  
**Test Steps:**
1. Open the file chooser and cancel without selecting a file.
2. Select a JPG at exactly the stated 2 MB limit if available.
3. Attempt to select a non-JPG/non-PNG file through the chooser.

**Expected Result:** Cancelling a selection hides the preview without throwing a script error. A file at 2 MB is not rejected by the JavaScript size check. The file chooser advertises PNG/JPEG through the `accept` attribute; enforcement of file type by the browser should be observed, and no server-side type validation is expected from the current frontend.  
**Actual Result:** The configured photo type and size restrictions were tested and the tested boundary conditions were handled correctly.  
**Status:** PASS

### G. Description Character Counter

#### TC-018

**Test Case ID:** TC-018  
**Module:** Description character counter  
**Test Scenario:** Verify counter updates at empty, minimum, maximum, and over-maximum description lengths.  
**Precondition:** Report page is loaded.  
**Test Steps:**
1. Observe the initial description counter.
2. Enter a 20-character description.
3. Enter a 500-character description.
4. Attempt to enter more than 500 characters.
5. Delete the content back to empty.

**Expected Result:** The counter starts at `0`, reflects the current value length, shows `20` for the minimum boundary and `500` for the maximum boundary, and the textarea enforces its `maxlength` boundary. The counter returns to `0` when cleared.  
**Actual Result:** The description character counter updated correctly while entering text and the defined character limit was enforced.  
**Status:** PASS

### H. Map Functionality

#### TC-019

**Test Case ID:** TC-019  
**Module:** Map functionality  
**Test Scenario:** Verify Leaflet map initialization and default location.  
**Precondition:** Report page is loaded with internet access and Leaflet CDN resources available.  
**Test Steps:**
1. Open the report page.
2. Inspect the map region.
3. Inspect the initial hidden latitude and longitude values.

**Expected Result:** A Leaflet map is initialized in the map container, tile resources are requested, the view starts at the configured Bengaluru coordinates with zoom 14, and a marker is displayed at the same coordinates.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### I. Map Marker Dragging

#### TC-020

**Test Case ID:** TC-020  
**Module:** Map marker dragging  
**Test Scenario:** Verify dragging the map marker updates hidden coordinates.  
**Precondition:** Map has loaded and its marker is visible.  
**Test Steps:**
1. Drag the marker to a different valid map position.
2. Release the marker.
3. Inspect the hidden latitude and longitude fields.

**Expected Result:** The marker remains at the dropped position and the hidden fields update to the marker coordinates rounded to six decimal places.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### J. Map Click Interaction

#### TC-021

**Test Case ID:** TC-021  
**Module:** Map click interaction  
**Test Scenario:** Verify clicking the map moves the marker and updates coordinates.  
**Precondition:** Map has loaded and its marker is visible.  
**Test Steps:**
1. Click a different point inside the map.
2. Inspect the marker position.
3. Inspect the hidden latitude and longitude fields.

**Expected Result:** The marker moves to the clicked location and both hidden coordinate fields update to the clicked latitude and longitude rounded to six decimal places.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### K. Geolocation

#### TC-022

**Test Case ID:** TC-022  
**Module:** Geolocation  
**Test Scenario:** Verify successful browser geolocation updates the map and hidden fields.  
**Precondition:** Report page is loaded; browser location permission is available; a location response can be supplied by the browser.  
**Test Steps:**
1. Select Use my location.
2. Observe the button while the request is pending.
3. Allow location access and wait for the success callback.
4. Inspect the map, marker, hidden fields, and address error area.

**Expected Result:** The button temporarily displays `Finding you...` and is disabled. On success, the map centers at zoom 17, the marker moves to the returned coordinates, hidden fields contain six-decimal coordinates, the error area is cleared, and the button is restored.  
**Actual Result:** Not Tested  
**Status:** Not Tested

#### TC-023

**Test Case ID:** TC-023  
**Module:** Geolocation  
**Test Scenario:** Verify geolocation failure and unsupported-browser handling.  
**Precondition:** Report page is loaded.  
**Test Steps:**
1. Deny location permission or simulate a geolocation error.
2. Inspect the button and address error area.
3. In a browser context without `navigator.geolocation`, select Use my location.

**Expected Result:** On a geolocation error, a failure message is displayed, the button is restored and enabled, and the map remains usable. When geolocation is unavailable, the fallback message instructs the user to type the address instead.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### L. My Reports Page

#### TC-024

**Test Case ID:** TC-024  
**Module:** My Reports page  
**Test Scenario:** Verify the static report cards, statuses, navigation, and report action.  
**Precondition:** Open `my-reports.html`; image files and CDN resources are available where applicable.  
**Test Steps:**
1. Inspect the three report cards and their status badges.
2. Select Report an issue.
3. Select Home, Report an issue, and Sign out navigation links.
4. Inspect image loading for the three referenced sample images.

**Expected Result:** Three static report cards display their text and status values, Report an issue opens `report.html`, navigation links point to their configured pages, and referenced images display when the corresponding files exist.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### M. Admin Dashboard

#### TC-025

**Test Case ID:** TC-025  
**Module:** Admin dashboard  
**Test Scenario:** Verify dashboard structure, summary tiles, complaints table, and modal controls.  
**Precondition:** Open `admin.html` with Bootstrap and script resources available.  
**Test Steps:**
1. Inspect the four summary tiles and their displayed counts.
2. Inspect search and filter controls.
3. Inspect the complaints table and four static complaint rows.
4. Select an Update button.

**Expected Result:** The dashboard displays the summary tiles, filter controls, table columns, complaint rows, and status modal control. The Update selection opens the Bootstrap status modal.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### N. Admin Search

#### TC-026

**Test Case ID:** TC-026  
**Module:** Admin search  
**Test Scenario:** Verify case-insensitive partial search across complaint row text.  
**Precondition:** Admin dashboard is loaded.  
**Test Steps:**
1. Enter a lowercase partial title in Search complaints.
2. Replace it with an uppercase area term.
3. Replace it with a complaint number fragment.
4. Clear the search field.

**Expected Result:** Rows whose combined text contains the lowercase-normalized search term remain visible; nonmatching rows are hidden. Clearing the search restores rows permitted by the other filters.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### O. Category Filtering

#### TC-027

**Test Case ID:** TC-027  
**Module:** Category filtering  
**Test Scenario:** Verify each category option and the All categories option.  
**Precondition:** Admin dashboard is loaded with no search term and status filter set to All statuses.  
**Test Steps:**
1. Select Garbage.
2. Select Pothole.
3. Select Streetlight.
4. Select Water.
5. Select All categories.

**Expected Result:** Each category selection displays only rows whose `data-category` matches the selected value. All categories displays all rows subject to the status and search filters.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### P. Status Filtering

#### TC-028

**Test Case ID:** TC-028  
**Module:** Status filtering  
**Test Scenario:** Verify each status option and the All statuses option.  
**Precondition:** Admin dashboard is loaded with no search term and category filter set to All categories.  
**Test Steps:**
1. Select Pending.
2. Select In progress.
3. Select Resolved.
4. Select All statuses.

**Expected Result:** Each status selection displays only rows whose `data-status` matches the selected value. All statuses displays all rows subject to the category and search filters.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### Q. Combined Filtering

#### TC-029

**Test Case ID:** TC-029  
**Module:** Combined filtering  
**Test Scenario:** Verify search, category, and status criteria are applied together.  
**Precondition:** Admin dashboard is loaded.  
**Test Steps:**
1. Enter a search term matching a known complaint.
2. Select the matching category.
3. Select the matching status.
4. Change one criterion to a nonmatching value.
5. Clear all criteria.

**Expected Result:** A row is shown only when it matches the search term, selected category, and selected status. A nonmatching criterion hides the row. Clearing the criteria restores all matching static rows.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### R. Empty Search Results

#### TC-030

**Test Case ID:** TC-030  
**Module:** Empty search results  
**Test Scenario:** Verify the empty-state row appears when no complaint matches.  
**Precondition:** Admin dashboard is loaded.  
**Test Steps:**
1. Enter a search term that does not occur in any complaint row, such as a unique random string.
2. Inspect the table body.
3. Clear the search field.

**Expected Result:** All complaint rows are hidden and the `emptyRow` message becomes visible. Clearing the search hides the empty row and restores matching complaint rows.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### S. Status Update Modal

#### TC-031

**Test Case ID:** TC-031  
**Module:** Status update modal  
**Test Scenario:** Verify the modal is populated from each Update button's data attributes.  
**Precondition:** Admin dashboard is loaded.  
**Test Steps:**
1. Select Update for each of the four complaint rows.
2. Inspect the modal title, hidden complaint ID, and status selection.
3. Change the status selection and enter an optional remark.
4. Select Cancel.

**Expected Result:** The modal opens for each row and displays that row's title, ID, and current status. The status control accepts the available status options, the remark is optional, and Cancel closes the modal without a frontend status persistence operation.  
**Actual Result:** Not Tested  
**Status:** Not Tested

#### TC-032

**Test Case ID:** TC-032  
**Module:** Status update modal  
**Test Scenario:** Verify status update form submission boundary and backend limitation.  
**Precondition:** Open the status modal with a complaint selected.  
**Test Steps:**
1. Leave the required Status control at a valid option.
2. Leave the remark empty and select Save status.
3. Repeat with a non-empty remark.

**Expected Result:** The browser permits submission because the required status is selected and submits the form toward `update_status.php`. Whether the status is saved or reflected elsewhere cannot be tested without a backend endpoint.  
**Actual Result:** Not Tested  
**Status:** Not Tested

### T. Responsive and Mobile UI

#### TC-033

**Test Case ID:** TC-033  
**Module:** Responsive/mobile UI  
**Test Scenario:** Verify home, authentication, report, My Reports, and admin pages at mobile viewport sizes.  
**Precondition:** Use a supported browser at 375 x 667 and 390 x 844 viewports.  
**Test Steps:**
1. Open each page at both viewport sizes.
2. Inspect navigation, headings, forms, buttons, cards, report images, map, table, and modal.
3. Scroll horizontally and vertically.
4. Interact with controls that are visible at the mobile size.

**Expected Result:** Content remains readable and usable without unintended horizontal overflow. Bootstrap responsive layouts stack or collapse appropriately; the map remains visible; forms and buttons remain reachable; the admin table can be inspected through its responsive container; and modal content remains accessible.  
**Actual Result:** Not Tested  
**Status:** Not Tested

#### TC-034

**Test Case ID:** TC-034  
**Module:** Responsive/mobile UI  
**Test Scenario:** Verify desktop layout and intermediate responsive breakpoints.  
**Precondition:** Use a supported browser at desktop and tablet-sized viewports.  
**Test Steps:**
1. Test at a wide desktop viewport.
2. Test at an intermediate viewport near the Bootstrap `lg` breakpoint.
3. Resize continuously through the breakpoint.
4. Inspect navigation, hero columns, report form width, summary tiles, and table.

**Expected Result:** Layout changes remain stable during resizing, columns stack or align according to the Bootstrap grid, and no content or controls become inaccessible.  
**Actual Result:** Not Tested  
**Status:** Not Tested

#### TC-035

**Test Case ID:** TC-035  
**Module:** Responsive/mobile UI  
**Test Scenario:** Verify keyboard focus visibility and reduced-motion styling.  
**Precondition:** Use a supported browser; keyboard navigation is available.  
**Test Steps:**
1. Navigate through links, buttons, inputs, selects, and textareas using the keyboard.
2. Inspect focus indicators.
3. Enable the operating system or browser reduced-motion preference.
4. Interact with controls again.

**Expected Result:** Focused interactive controls show the configured visible outline. When reduced motion is enabled, CSS transitions are disabled by the media query.  
**Actual Result:** Not Tested  
**Status:** Not Tested

## 5. Defect Log

| Bug ID | Test Case ID | Module | Issue | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|---|---|

## 6. Test Execution Summary

Total Planned: 35  
Total Executed: 18  
Passed: 18  
Failed: 0  
Blocked: 0  
Not Tested: 17  
Pass Percentage: 100%

## 7. Testing Limitations

The current project is a frontend implementation consisting of static HTML, CSS, and JavaScript. Backend/PHP/MySQL integration is not currently available for testing.

The following areas cannot currently be verified end to end:

- Account creation, duplicate-account handling, password storage, and authentication
- Login success, failed-login responses, sessions, sign-out behavior, and access control
- Report submission persistence and server-side validation
- Photo upload transport, storage, retrieval, and server-side file validation
- Saving report coordinates, ward data, and complaint details to a database
- Loading a user's reports from a database or verifying user-specific report isolation
- Admin authorization and dashboard data retrieval
- Persisting status changes and displaying updated statuses to users
- PHP endpoint responses for `process_register.php`, `process_login.php`, `submit_report.php`, and `update_status.php`
- Database counts, query behavior, and MySQL error handling

TC-001 through TC-018 contain manually provided execution results. TC-019 through TC-035 remain `Not Tested`. No additional test result or defect has been inferred from source inspection alone.

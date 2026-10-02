# EcoReport - frontend

Five pages, one stylesheet, one script file. Bootstrap 5 and Leaflet load from a CDN,
so keep an internet connection while testing.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: hero, how it works, categories |
| `register.html` | Citizen signup |
| `login.html` | Citizen signin |
| `report.html` | The main form: category, title, description, photo, map location |
| `my-reports.html` | Citizen's own complaints with status |
| `admin.html` | Authority dashboard: tiles, search, filters, table, status modal |
| `assets/css/style.css` | All custom styling |
| `assets/js/script.js` | Photo preview, map, geolocation, validation, filters |

## To see it

Open `index.html` in a browser. Nothing else is needed for the frontend.
For the PHP version, put the folder inside `htdocs` (XAMPP) and open
`http://localhost/ecoreport/`.

## Changing the look

All colours are at the top of `style.css` in `:root`. Change `--eco-green`
and the whole site follows.

## Adding your own photos

Put four images in `assets/images/` named `sample1.jpg` to `sample4.jpg`,
or change the `src` paths in `my-reports.html` and `admin.html`.

## Turning these into PHP pages

1. Rename each `.html` to `.php`.
2. Cut the navbar into `includes/header.php` and the footer into `includes/footer.php`,
   then start every page with `<?php include 'includes/header.php'; ?>`.
3. Replace the hard-coded sample rows and cards with a `while` loop over your
   query results. The comments in each file mark exactly where.
4. Point each form's `action` at the matching PHP file.

## Field names used in the forms

Match these to your MySQL columns so no rework is needed.

**users:** `full_name`, `email`, `phone`, `password`

**complaints:** `issue_category`, `issue_title`, `issue_description`,
`issue_photo`, `issue_address`, `latitude`, `longitude`, `ward`, `status`, `remark`

## Suggested tables

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(15),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  issue_category VARCHAR(30) NOT NULL,
  issue_title VARCHAR(80) NOT NULL,
  issue_description TEXT NOT NULL,
  issue_photo VARCHAR(255),
  issue_address VARCHAR(255),
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  ward VARCHAR(80),
  status ENUM('pending','progress','resolved') DEFAULT 'pending',
  remark TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Two things to tell your teammate

- The report form has `enctype="multipart/form-data"`. Without it the photo upload
  fails silently, so it must stay.
- The JavaScript validation is only for quick feedback. Every check has to be
  repeated in PHP, and queries should use prepared statements.

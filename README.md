# Dateutils

Dateutils is a website offering a couple free tools: Calendar, Timezone Table, and TImezone Converter. This project is open source and aims to provide useful tools for users. Contributions are welcome!

## Table of Contents

- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [License](#License)
- [Contact](#Contact)

## Features

### 1. Calendar

This is a simple calendar. 

- Switching display months: one or two
- Calendar dates are selectable
- Selecting two days, selected range info is displayed which contains duration, days and business days
- Responsive design
- Set your own holidays
- Holidays data is stored in the browser's local storage

### 2. Timezone Table

- Display multi timezones in a table
- Current time is displayed as a red bar
- Add or delete timezones
- Timezones data is stored in the browser's local storage

### 3. Timezone Converter

- Convert date to another timezone
- Convert results are displayed in six different format
- Easy to copy convert results

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed

### Clone the repository

```sh
git clone git@github.com:wmorioka/dateutils.git
cd dateutils
```

### Install dependencies

```sh
npm install
```

### Running locally

```sh
npm run dev
```

URL will display in the terminal, so navigate to it.

To compile tailwind css, run the below command in another terminal window.

```sh
npm run devcss
```

## Libraries

This project use the following libraries or tools.

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue-multiselect](https://vue-multiselect.js.org/)
- [Day.js](https://day.js.org/)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
1. Commit your Changes (git commit -m 'Add some AmazingFeature')
1. Push to the Branch (git push origin feature/AmazingFeature)
1. Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

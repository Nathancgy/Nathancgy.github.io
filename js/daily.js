document.addEventListener('DOMContentLoaded', () => {
    const records = [
        { date: '2024/03/17', text: 'Read three amazingly good articles that explained the Transformer. Planning to handwrite notes this week.' },
        { date: '2024/03/16', text: 'Spent an entire day outdoors with OpenTeens members. Decided on a new project using OCR text extraction and LLM to detect rumors.' },
        { date: '2024/03/15', text: 'Read about word Embeddings. Contributed to a GitHub project on LLM tutorials, which was merged within five minutes!' },
        // Add more records as needed
    ];
    function addRecord(date, text) {
        records.push({ date, text });
        renderRecords();
    }
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let currentYearFilter = null;
    let currentMonthFilter = null;

    function populateYearDropdown() {
        const yearDropdown = document.getElementById('filter-year-dropdown');
        const uniqueYears = Array.from(new Set(records.map(record => record.date.split('/')[0]))).sort().reverse();
        yearDropdown.innerHTML = `<a href="#" data-year="all">All</a>` + uniqueYears.map(year => `<a href="#" data-year="${year}">${year}</a>`).join('');
    }

    function populateMonthDropdown() {
        const monthDropdown = document.getElementById('filter-month-dropdown');
        monthDropdown.innerHTML = `<a href="#" data-month="all">All</a>` + monthNames.map((month, index) => `<a href="#" data-month="${index + 1}">${month}</a>`).join('');
    }

    document.getElementById('filter-year-dropdown').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const year = e.target.getAttribute('data-year');
            currentYearFilter = year !== 'all' ? year : null;
            renderRecords();
        }
    });

    document.getElementById('filter-month-dropdown').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const month = e.target.getAttribute('data-month');
            currentMonthFilter = month !== 'all' ? month.padStart(2, '0') : null; 
            renderRecords();
        }
    });

    addRecord('2022/05/18', 'Example of adding a new record.');

    populateYearDropdown();
    populateMonthDropdown();

    document.getElementById('filter-year-dropdown').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const selectedYear = e.target.getAttribute('data-year');
            currentYearFilter = selectedYear === 'all' ? null : selectedYear;
            const filterYearButtonText = selectedYear === 'all' ? 'All' : selectedYear;
            document.getElementById('filter-year-button').textContent = `Filter by Year: ${filterYearButtonText}`;
            
            renderRecords();
        }
    });

    document.getElementById('filter-month-dropdown').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const selectedMonth = e.target.getAttribute('data-month');
            currentMonthFilter = selectedMonth === 'all' ? null : selectedMonth.padStart(2, '0'); 
            const filterMonthButtonText = selectedMonth === 'all' ? 'All' : monthNames[parseInt(selectedMonth, 10) - 1];
            document.getElementById('filter-month-button').textContent = `Filter by Month: ${filterMonthButtonText}`;
            
            renderRecords();
        }
    });

    function renderRecords(filterDate = null) {
        const sortedRecords = records.sort((a, b) => new Date(b.date) - new Date(a.date));
        const filteredRecords = records.filter(record => {
            const [year, month] = record.date.split('/');
            const matchesYear = currentYearFilter && currentYearFilter !== 'all' ? year === currentYearFilter : true;
            const matchesMonth = currentMonthFilter && currentMonthFilter !== 'all' ? month === currentMonthFilter : true;
            return matchesYear && matchesMonth;
        });
        const dailyElement = document.getElementById('daily');
        dailyElement.innerHTML = '';

        const recordsByYear = filteredRecords.reduce((acc, record) => {
            const year = record.date.split('/')[0];
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(record);
            return acc;
        }, {});

        const sortedYears = Object.keys(recordsByYear).sort((a, b) => b - a);

        sortedYears.forEach(year => {
            const yearTitleElement = document.createElement('h2');
            yearTitleElement.textContent = year;
            dailyElement.appendChild(yearTitleElement);

            recordsByYear[year].forEach(record => {
                const recordElement = document.createElement('div');
                recordElement.className = 'record';
                recordElement.innerHTML = `
                    <div class="record-date">${record.date.substring(5)}</div> <!-- Remove year from display -->
                    <div class="record-text">${record.text}</div>
                `;
                dailyElement.appendChild(recordElement);
            });
        });
    }

    function updateFilterButton() {
        const dates = records.map(record => record.date);
        const uniqueDates = Array.from(new Set(dates)).sort((a, b) => new Date(b) - new Date(a));
        const dropdownContentElement = document.getElementById('filter-dropdown');
        dropdownContentElement.innerHTML = `<a href="#" data-date="all">All</a><a href="#" data-date="2024">2024</a>`; // Add 'All' and '2024' options
        uniqueDates.forEach(date => {
            dropdownContentElement.innerHTML += `<a href="#" data-date="${date}">${date.substring(5)}</a>`; // Use substring to remove year from display
        });
    }
    document.querySelector('.dropdown').addEventListener('click', function(e) {
        const target = e.target;
        if (target.tagName === 'A') { 
            const selectedDate = target.getAttribute('data-date');
            filterRecords(selectedDate);
        }
    });

    window.filterRecords = function(date) {
        renderRecords(date === 'all' ? null : date); 
    };

});

# Company Dashboard

A modern, interactive company dashboard built with React and TypeScript that provides comprehensive financial analysis and visualization tools for investors and analysts.

## Features

### 🏢 Main Information
- Company overview with key metrics
- Real-time share price and market data
- Sector and industry classification
- Key performance indicators

### 📊 Financial Statements
- **7-year financial data** (4 historical + 3 forecast years)
- **FYE-Dec, $m** formatting with currency indicators
- Complete financial metrics including:
  - Revenue and Revenue y/y growth
  - Gross profit and Gross profit y/y growth
  - Gross margin % (italic formatting)
  - Operating Profit, Adj. and y/y growth
  - Operating Margin % (italic formatting)
  - EPS and EPS y/y growth
  - Operating Cash Flow, CAPEX, Free Cash Flow
  - Net Debt and Net Debt/EBITDA ratio
- **Copy & paste functionality** for all metrics
- Italic formatting for margin and y/y metrics

### 🤖 Bull vs Bear Debate
- AI-generated investment analysis
- Balanced bull and bear arguments
- Interactive popup explaining AI methodology
- Professional presentation with color-coded sections

### 📈 Interactive Charts
- **Default configuration**: Share Price vs NTM P/E vs NTM EPS
- **Multiple chart types**: Line, Area, Bar, Composed charts
- **Dynamic axis selection**: Choose any metric for X, Y1, Y2, Y3 axes
- **Real-time updates**: Interactive chart customization
- **Responsive design**: Works on all screen sizes

### 🏆 Peer Comparison
- **Dynamic table** with all required metrics:
  - Name, Market Cap, ADV
  - EPS FY+1 y/y, EPS FY+2 y/y
  - P/E FY+1, P/E FY+2
- **Add/Remove columns**: Customize comparison metrics
- **Add/Remove peers**: Dynamic peer management
- **Data type support**: Text, Number, Percentage formatting
- **Real-time updates**: Instant table modifications

## Technology Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for modern UI components
- **Recharts** for interactive data visualization
- **Framer Motion** for smooth animations
- **Date-fns** for date handling

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jpdibo/researchinsight_dashboard
   cd company_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── MainInfo.tsx          # Company overview section
│   ├── FinancialStatements.tsx # Financial data table
│   ├── BullBearDebate.tsx    # AI analysis section
│   ├── ChartSection.tsx      # Interactive charts
│   └── PeerComparison.tsx    # Peer comparison table
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
└── index.css                 # Global styles
```

## Customization

### Adding Real Data
Replace the mock data in each component with your actual data sources:

1. **MainInfo.tsx** - Update `companyData` object
2. **FinancialStatements.tsx** - Replace `financialData` object
3. **ChartSection.tsx** - Update `chartData` array
4. **PeerComparison.tsx** - Replace `peers` array

### Styling
- Global styles are in `src/index.css`
- Component-specific styles use Material-UI's `sx` prop
- Theme customization in `App.tsx`

### Data Integration
The dashboard is designed to easily integrate with:
- Financial APIs (Bloomberg, Reuters, etc.)
- Database systems
- Real-time data feeds
- Custom data sources

## Features for Investors

### 📋 Investment Analysis
- Comprehensive financial overview
- Growth trajectory analysis
- Margin expansion tracking
- Cash flow analysis
- Debt management monitoring

### 🔍 Comparative Analysis
- Peer benchmarking
- Industry positioning
- Valuation multiples comparison
- Growth rate analysis

### 📊 Data Export
- Copy individual metrics
- Export financial statements
- Chart screenshots
- Peer comparison data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demonstration project with mock data. For production use, replace all mock data with real financial data sources and implement proper data validation and error handling. 

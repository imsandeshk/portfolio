# Supply Chain Management (SCM) Frontend Application

A comprehensive, modern frontend web application for managing supply chain operations with role-based access control, real-time tracking, and analytics.

## 🚀 Features

### User Authentication & Role-Based Access
- **5 User Roles**: Farmers, Logistics Partners, Market Agents, Buyers, and Administrators
- Role-based access control with protected routes
- Secure authentication context
- Easy role switching in demo mode

### Role-Specific Dashboards

#### 👨‍🌾 Farmer Dashboard
- Track crop shipments from farm to destination
- Update shipment status and conditions
- View logistics partner details
- Create new shipments
- Monitor active deliveries

#### 🚚 Logistics Partner Dashboard
- Manage active deliveries
- Update transit checkpoints
- Track vehicle fleet
- Monitor delivery status
- Update vehicle locations

#### 🛒 Buyer Dashboard
- View order status
- Track incoming shipments
- Monitor estimated delivery times
- Review delivery history
- Access shipment details

#### 👔 Market Agent Dashboard
- Monitor incoming shipments
- Track processed shipments
- View farmer connections
- Manage market operations

#### 🛡️ Admin Dashboard
- User management across all roles
- Dispute resolution system
- System-wide analytics
- Oversee all supply chain activities
- Generate comprehensive reports

### 📦 Shipment Tracking
- **Real-time tracking** with interactive maps
- **Timeline view** showing all checkpoints
- Detailed shipment information
- Temperature and humidity monitoring
- Handler information at each checkpoint
- Current location indicators
- Route visualization

### 🗺️ Interactive Maps
- Leaflet-based map integration
- Origin and destination markers
- Current location tracking
- Checkpoint visualization
- Route path display
- Color-coded status indicators

### 📝 Data Entry Forms
- Comprehensive shipment creation form
- Crop details (type, quantity, quality)
- Origin and destination information
- Storage conditions (temperature, humidity)
- Packaging specifications
- Special handling instructions

### 🔔 Notifications & Alerts
- Real-time notification system
- Categorized alerts (delays, exceptions, deliveries, updates)
- Unread notification counter
- Mark as read/unread functionality
- Notification filtering (unread, all, read)
- Delete and clear all options
- Time-based display (e.g., "2 hours ago")

### 📊 Analytics & Reports

#### Analytics Dashboard
- **Performance Trends**: Daily shipment metrics and trends
- **Status Distribution**: Visual breakdown of shipment statuses
- **Bottleneck Analysis**: Identify supply chain delays
- **Key Metrics**:
  - Total shipments
  - On-time delivery rate
  - Average delivery time
  - Delayed shipments count
- Interactive charts using Recharts

#### Reports Module
- Pre-configured report templates
- Custom report generation
- Multiple report types:
  - Shipment Summary
  - Performance Report
  - Delays & Exceptions
  - Financial Summary
  - Inventory Report
  - Customer Report
- Date range selection
- Quick reports (daily, weekly, monthly)
- Export functionality (PDF, CSV, Excel)

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Built with shadcn/ui components
- **Dark Theme**: Professional dark color scheme
- **Smooth Animations**: Framer Motion for transitions
- **Accessible**: ARIA labels and keyboard navigation
- **Consistent Styling**: Tailwind CSS utility classes
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: User feedback for actions

## 🛠️ Technology Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### UI Components
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

### Data Visualization
- **Recharts** - Charts and graphs
- **Leaflet** - Interactive maps
- **React Leaflet** - Leaflet React bindings

### State Management
- **React Context API** - Global state
- **TanStack Query** - Server state
- **Custom Hooks** - Reusable logic

### Utilities
- **date-fns** - Date formatting
- **zod** - Schema validation
- **React Hook Form** - Form management

## 📁 Project Structure

```
src/
├── components/
│   ├── scm/
│   │   ├── Layout.tsx          # Main layout with navigation
│   │   └── ShipmentMap.tsx     # Interactive map component
│   └── ui/                     # shadcn/ui components
├── contexts/
│   ├── SCMAuthContext.tsx      # Authentication state
│   └── NotificationContext.tsx # Notification management
├── pages/
│   └── scm/
│       ├── Login.tsx           # Authentication page
│       ├── Dashboard.tsx       # Role-based dashboard router
│       ├── dashboards/
│       │   ├── FarmerDashboard.tsx
│       │   ├── LogisticsDashboard.tsx
│       │   ├── BuyerDashboard.tsx
│       │   ├── AdminDashboard.tsx
│       │   └── MarketAgentDashboard.tsx
│       ├── ShipmentTracking.tsx
│       ├── AllShipments.tsx
│       ├── CreateShipment.tsx
│       ├── Notifications.tsx
│       ├── Analytics.tsx
│       └── Reports.tsx
├── types/
│   └── scm.ts                  # TypeScript definitions
├── utils/
│   └── demoNotifications.ts    # Demo data
├── SCMApp.tsx                  # Main app component
└── main.tsx                    # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Demo Accounts

The application includes demo authentication. You can log in with:

- **Email**: any@email.com
- **Password**: any
- **Role**: Select from dropdown (Farmer, Logistics, Buyer, Admin, Market Agent)

## 🎯 Key Features by Page

### Login Page (`/scm/login`)
- Role selection dropdown
- Clean, modern authentication UI
- Demo account information

### Dashboard (`/scm/dashboard`)
- Role-specific views
- Key performance metrics
- Quick action buttons
- Recent activity

### Shipments (`/scm/shipments`)
- List all shipments
- Search and filter
- Status-based tabs
- Quick actions

### Shipment Tracking (`/scm/shipments/:id/track`)
- Interactive map
- Timeline view
- Checkpoint details
- Current conditions
- Temperature/humidity tracking

### Create Shipment (`/scm/shipments/create`)
- Multi-section form
- Crop details
- Origin/destination
- Storage conditions
- Special instructions

### Notifications (`/scm/notifications`)
- Categorized notifications
- Read/unread filtering
- Bulk actions
- Time-based display

### Analytics (`/scm/analytics`)
- Performance charts
- Status distribution
- Bottleneck analysis
- Trend visualization

### Reports (`/scm/reports`)
- Report templates
- Custom report builder
- Date range selection
- Export options

## 🔧 Customization

### Adding New User Roles
1. Update `UserRole` type in `src/types/scm.ts`
2. Create new dashboard in `src/pages/scm/dashboards/`
3. Add route in `src/pages/scm/Dashboard.tsx`
4. Update login page role selector

### Integrating Backend API
Replace mock data in components with API calls:
```typescript
// Example in a dashboard component
useEffect(() => {
  const fetchShipments = async () => {
    const response = await fetch('/api/shipments');
    const data = await response.json();
    setShipments(data);
  };
  fetchShipments();
}, []);
```

### Adding Real-time Updates
Integrate WebSocket or Server-Sent Events:
```typescript
useEffect(() => {
  const ws = new WebSocket('ws://your-api/shipments');
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    // Update shipment state
  };
  return () => ws.close();
}, []);
```

## 🎨 Styling

The application uses Tailwind CSS with custom configuration:
- Dark theme by default
- Custom color palette
- Responsive breakpoints
- Custom animations

To modify the theme, edit `tailwind.config.ts`.

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 Environment Variables

Create a `.env` file for configuration:
```env
VITE_API_URL=https://your-api-url.com
VITE_MAP_TILES_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🎉 Acknowledgments

- shadcn/ui for the component library
- Leaflet for map functionality
- Recharts for data visualization
- The React and TypeScript communities

---

Built with ❤️ for efficient supply chain management

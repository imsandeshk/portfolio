# Supply Chain Management Frontend Application

A comprehensive React-based frontend application for managing supply chain operations across different stakeholders including farmers, logistics partners, market agents, buyers, and administrators.

## 🚀 Features

### 🔐 Authentication & Role Management
- **Multi-role Authentication**: Support for farmers, logistics partners, market agents, buyers, and administrators
- **Role-based Access Control**: Different dashboards and features based on user roles
- **Secure Login/Registration**: Email-based authentication with password protection

### 📊 Role-Specific Dashboards

#### 👨‍🌾 Farmer Dashboard
- Track crop shipments and their movement
- Update shipment status and logistics details
- View delivery progress and estimated arrival times
- Manage crop inventory and quality information

#### 🚛 Logistics Partner Dashboard
- Update transit checkpoints and delivery statuses
- Track vehicle locations and routes
- Manage delivery schedules and driver assignments
- Monitor cargo conditions and temperature

#### 🏪 Market Agent Dashboard
- Facilitate transactions between farmers and buyers
- Manage active connections and negotiations
- Track commission and transaction history
- Connect parties and manage deals

#### 🛒 Buyer Dashboard
- View shipment status and estimated delivery times
- Track orders and manage deliveries
- Rate farmers and manage favorite suppliers
- Monitor order history and spending

#### 🛡️ Admin Dashboard
- Oversee supply chain activities and user management
- Resolve disputes and manage system settings
- Generate reports and analytics
- Monitor system performance and user activity

### 📦 Shipment Tracking
- **Real-time Updates**: Live tracking of shipments with timestamps and handlers
- **Interactive Maps**: Visual representation of shipment routes and current locations
- **Checkpoint Management**: Track progress through various supply chain checkpoints
- **Status Updates**: Real-time status changes and notifications

### 📝 Data Entry Forms
- **Shipment Creation**: Comprehensive forms for creating new shipments
- **Delivery Updates**: Forms for logistics partners to update delivery status
- **Quality Tracking**: Record temperature, humidity, and cargo conditions
- **Documentation**: Capture all necessary shipment details and requirements

### 🔔 Notifications & Alerts
- **Real-time Notifications**: Instant alerts for delays, exceptions, and updates
- **Alert Center**: Centralized notification management
- **Priority-based Alerts**: High, medium, and low priority notifications
- **Action Required**: Track notifications that need user attention

### 📈 Reports & Analytics
- **Performance Metrics**: Delivery times, success rates, and efficiency metrics
- **Revenue Analytics**: Track revenue, expenses, and profit trends
- **Crop Distribution**: Analyze crop types and distribution patterns
- **Custom Reports**: Generate PDF and Excel reports with custom filters

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices and varying screen sizes
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Cross-Platform**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI with Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Management**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supply-chain-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/       # Role-specific dashboard components
│   ├── forms/          # Data entry forms
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility libraries
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── admin/          # Admin pages
├── services/           # API services
└── utils/              # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema
The application expects the following database tables:
- `user_profiles` - User profile information
- `shipments` - Shipment data
- `deliveries` - Delivery tracking
- `notifications` - User notifications
- `transactions` - Market transactions

## 🎨 Customization

### Theming
The application uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.ts` file.

### Adding New Roles
1. Update the `UserRole` type in `src/contexts/AuthContext.tsx`
2. Create a new dashboard component in `src/components/dashboard/`
3. Add the role to the registration form options
4. Update the routing in `src/App.tsx`

### Adding New Features
1. Create components in the appropriate directory
2. Add new routes in `src/App.tsx`
3. Update the navigation in `src/components/layout/DashboardLayout.tsx`

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface elements
- Responsive navigation with collapsible sidebar
- Mobile-optimized forms and data entry
- Gesture support for interactive elements

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management for modals and forms

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 📦 Deployment

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Docker
```bash
# Build Docker image
docker build -t supply-chain-app .

# Run container
docker run -p 3000:3000 supply-chain-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

## 🔮 Roadmap

- [ ] Real-time GPS tracking integration
- [ ] Mobile app development
- [ ] Advanced analytics and AI insights
- [ ] Blockchain integration for transparency
- [ ] IoT sensor integration
- [ ] Multi-language support
- [ ] Advanced reporting and BI tools

---

Built with ❤️ for the agricultural supply chain community.
// Dbanyan Group - Professional Admin Dashboard
// Amazon-style administrative interface with comprehensive e-commerce management

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { 
  Container, 
  Box,
  Alert,
  Center,
  Stack,
  Text
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboardOverview from '../components/admin/AdminDashboardOverview';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import { getCurrentUser, logoutUser } from '../store/slices/authSlice';
import Verify from '../API_FILES/auth_apis/Verify';
import Logout from '../API_FILES/auth_apis/Logout';
import CustomLoader from '../Loader/CustomLoader';
import CategoryManagement from '../components/admin/Categories';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated,setisAuthnticated] = useState(false);
    const [name,setname] = useState("");
    const [admin,setadmin] = useState(false);
    const [loading,setloading]=useState(false)
const scheduleAutoLogout = () => {
      const expiry = localStorage.getItem("tehunyzu@37673");
      if (!expiry) return;
    
      const timeout = expiry - Date.now();
      if (timeout > 0) {
        setTimeout(() => {
          logoutUser(); // clear storage, redirect
        }, timeout);
      } else {
        logoutUser();
      }
    };
    const verifyuser=async()=>{
      setloading(true)
      const expiry=localStorage.getItem('tehunyzu@37673')
      const timeout = expiry - Date.now();
      if(timeout>0 && expiry){
        const res=await Verify()
        if(res?.message=="Login verified successfully"){
          setisAuthnticated(true)
          setname(res?.userId)
          setadmin(res?.admin)
          console.log("yedhwb2781980@998")
          // console.log(res)
          setloading(false)
        }
        
      }
      
    }
    
    useEffect(()=>{
    scheduleAutoLogout()
    verifyuser()
    
    },[])
    const logoutUser = async() => {
            const res=await Logout()
      
    };

  // // Get auth state from Redux
  // const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);

  
  // Store admin state in localStorage
  useEffect(() => {
    if (activeView) {
      localStorage.setItem('admin_active_view', activeView);
    }
  }, [activeView]);

  // Restore admin state from localStorage
  useEffect(() => {
    const storedView = localStorage.getItem('admin_active_view');
    if (storedView && ['dashboard', 'products', 'orders', 'customers', 'analytics'].includes(storedView)) {
      setActiveView(storedView);
    }
  }, []);

  // IMPORTANT: Authentication check - redirect if not authorized
  useEffect(() => {
    // This effect already runs in the main useEffect above
    // Keeping this comment for clarity
  }, []);

  // Show loading state if any data is loading
  if (loading) {
    return (
      <CustomLoader/>
    );
  }

  // Show unauthorized access message if user is not admin
  if (!admin ) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          <Center className="py-12">
            <Alert 
              icon={<IconAlertCircle size="1rem" />} 
              title="Access Denied" 
              color="red"
              radius="lg"
            >
              <Text>You don't have permission to access the admin dashboard.</Text>
            </Alert>
          </Center>
        </Container>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboardOverview />;
      case 'products':
        return <ProductManagement />;
      case 'category':
        return <CategoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'customers':
        return <UserManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Dbanyan Group</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Box className="min-h-screen bg-gray-50">
        <AdminLayout activeView={activeView} onViewChange={setActiveView}>
          {renderContent()}
        </AdminLayout>
      </Box>
    </>
  );
};

export default AdminDashboard;
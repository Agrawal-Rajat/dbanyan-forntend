// Quick test script to verify backend connection
async function testBackend() {
  try {
    console.log('🧪 Testing backend connection...');
    
    // Test featured products endpoint
    const response = await fetch('http://localhost:8000/api/v1/products/featured?limit=4');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connection successful!');
      console.log('📦 Featured products:', data);
      console.log('📊 Product count:', data.length);
      
      // Test product structure
      if (data.length > 0) {
        const product = data[0];
        console.log('🏷️ Sample product:', {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          stock: product.stock_quantity
        });
      }
      
      return true;
    } else {
      console.error('❌ Backend response error:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
}

// Run test
testBackend();

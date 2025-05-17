import AdminLayout from '@/components/layout/admin-layout';
import HotelList from '@/components/admin/resources/hotels/hotel-list';

export default function Home() {
  return (
    <AdminLayout>
      <HotelList />
    </AdminLayout>
  );
}
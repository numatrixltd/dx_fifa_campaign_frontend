import RegisterAdminForm from "../../../components/admin/RegisterAdminForm";
import AdminAuthGuard from "../../../components/admin/AdminAuthGuard";


export default function RegisterAdminPage() {
  return (
    <AdminAuthGuard>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-bold text-white">Add a new admin</h1>
        <RegisterAdminForm />
      </main>
    </AdminAuthGuard>
  );
}
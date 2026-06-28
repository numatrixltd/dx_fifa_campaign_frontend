import AdminAuthGuard from "../../../../components/admin/AdminAuthGuard";
import CountryForm from "../../../../components/admin/CountryForm";

export default function NewCountryPage() {
  return (
    <AdminAuthGuard>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-bold text-white">Add a country frame</h1>
        <CountryForm />
      </main>
    </AdminAuthGuard>
  );
}

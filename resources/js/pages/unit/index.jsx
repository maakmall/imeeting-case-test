import { Head, Link } from "@inertiajs/react";
import Layout from "../../layouts/main";
import Button from "../../components/button";
import Card from "../../components/card";

export default function Index({ units, message }) {
    return (
        <Layout>
            <Head title="Unit" />
            {message && (
                <div className="mb-4 p-4 text-white bg-green-500 rounded-lg">
                    {message}
                </div>
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[28px] font-bold text-dark">Unit</h1>
                    <div className="text-primary font-normal text-sm">
                        Daftar Unit
                    </div>
                </div>
                <div>
                    <Button
                        href="/units/create"
                        className="text-white bg-primary py-3 px-4 font-semibold text-sm tracking-wider rounded-lg"
                    >
                        + <span className="mx-1"></span> Tambah Unit
                    </Button>
                </div>
            </div>

            <Card className="mt-6">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Nama Unit</th>
                            <th className="p-3">Jumlah Ruangan</th>
                            <th className="p-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit) => (
                            <tr key={unit.id} className="hover:bg-gray-50">
                                <td className="p-3">{unit.name}</td>
                                <td className="p-3">
                                    {unit.meeting_rooms_count}
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Button
                                        href={`/units/${unit.id}/edit`}
                                        className="!bg-light !text-dark"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        method="delete"
                                        href={`/units/${unit.id}`}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Hapus
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </Layout>
    );
}

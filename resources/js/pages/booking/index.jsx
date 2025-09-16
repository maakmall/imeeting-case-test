import { Head } from "@inertiajs/react";
import Layout from "../../layouts/main";
import Button from "../../components/button";
import Card from "../../components/card";

export default function Index({ bookings, message }) {
    return (
        <Layout>
            <Head title="Ruang Meeting" />
            {message && (
                <div className="mb-4 p-4 text-white bg-green-500 rounded-lg">
                    {message}
                </div>
            )}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-[28px] font-bold text-dark">
                        Ruang Meeting
                    </h1>
                    <div className="text-primary font-normal text-sm">
                        Daftar Ruang Meeting
                    </div>
                </div>
                <div>
                    <Button
                        href="/bookings/create"
                        className="text-white bg-primary py-3 px-4 font-semibold text-sm tracking-wider rounded-lg"
                    >
                        + <span className="mx-1"></span> Pesan Ruangan
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="space-y-2">
                        <h2 className="text-lg font-bold text-dark">
                            Booking ID : {booking.id}
                        </h2>
                        <p className="text-sm text-dark">
                            Unit : {booking.unit.name}
                        </p>
                        <p className="text-sm text-dark">
                            Room : {booking.meeting_room.name}
                        </p>
                        <p className="text-sm text-dark">
                            Tanggal : {booking.meeting_date} (
                            {booking.start_time} - {booking.end_time})
                        </p>
                        <p className="text-sm text-dark">
                            Peserta : {booking.participants}
                        </p>
                        <p className="text-sm text-dark font-semibold">
                            Total Biaya : Rp{" "}
                            {booking.total_cost.toLocaleString("id")}
                        </p>
                        <div className="mt-4">
                            <Button
                                href={`/bookings/${booking.id}`}
                                className="text-white bg-red-500 py-2 px-4 text-sm rounded-lg"
                                method="delete"
                            >
                                Hapus
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </Layout>
    );
}

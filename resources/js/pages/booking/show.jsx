import { Head } from "@inertiajs/react";
import Layout from "../../layouts/main";
import Button from "../../components/button";
import Card from "../../components/card";
import { ChevronLeft } from "lucide-react";
import Breadcrumbs from "../../components/breadcrumbs";

const breadcrumbs = [
    { label: "Ruang Meeting", href: "/bookings" },
    { label: "Detail Booking" },
];

export default function Show({ booking }) {
    return (
        <Layout>
            <Head title="Detail Booking Ruangan" />
            <div className="flex items-start gap-4 mb-8">
                <Button href="/bookings" className="!p-3">
                    <ChevronLeft className="text-white size-4" />
                </Button>
                <div>
                    <h1 className="text-[28px] font-bold text-dark">
                        Ruang Meeting
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>

            <div className="flex gap-6">
                <Card className="flex-1">
                    <h2 className="font-semibold text-md text-dark mb-5">
                        Ruang Meeting
                    </h2>

                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Unit :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.unit.name}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Ruang Meeting :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.meeting_room.name}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Kapasitas :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.meeting_room.capacity} Orang
                            </p>
                        </div>
                    </div>

                    <hr className="my-9 text-light" />

                    <h2 className="font-semibold text-md text-dark mb-5">
                        Rapat
                    </h2>

                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Waktu :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.meeting_date} ({booking.start_time} -{" "}
                                {booking.end_time})
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Jumlah Orang :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.participants} Orang
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Dipesan Oleh :
                            </p>
                            <p className="text-sm text-dark">
                                {booking.user.name}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-sm font-semibold text-dark">
                                Tanggal Booking :
                            </p>
                            <p className="text-sm text-dark">
                                {new Date(booking.created_at).toUTCString()}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="flex-1">
                    <h2 className="font-semibold text-md text-dark mb-5">
                        Konsumsi
                    </h2>
                    <ul>
                        {booking.consumptions.map((c) => (
                            <li key={c.id} className="text-sm text-dark">
                                -{" "}
                                {c.type
                                    .replace("_", " ")
                                    .replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                    )}
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2 mt-5">
                        <p className="text-sm font-semibold text-dark">
                            Nominal :
                        </p>
                        <p className="text-sm text-dark">
                            Rp. {booking.total_cost.toLocaleString("id")}
                        </p>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}

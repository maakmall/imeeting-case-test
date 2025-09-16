import { Form, Head } from "@inertiajs/react";
import Layout from "../../layouts/main";
import { FormInput } from "../../components/form-input";
import { FormSelect } from "../../components/form-select";
import { FormCheckbox } from "../../components/form-checkbox";
import Button from "../../components/button";
import Card from "../../components/card";
import { ChevronLeft } from "lucide-react";
import Breadcrumbs from "../../components/breadcrumbs";
import { useEffect, useState } from "react";

const breadcrumbs = [
    { label: "Ruang Meeting", href: "/bookings" },
    { label: "Pesan Ruangan" },
];

const hours = Array.from({ length: 11 }, (_, i) => {
    const hour = 7 + i;
    const str = hour.toString().padStart(2, "0") + ":00";
    return { label: str, value: str };
});

const toMinutes = (time) => {
    if (!time) return null;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

const HARGA = {
    snackSiang: 20000,
    makanSiang: 30000,
    snackSore: 20000,
};

export default function Create({ units, message }) {
    const [selectedUnit, setSelectedUnit] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [participants, setParticipants] = useState(0);
    const [consumptions, setConsumptions] = useState({
        snackSiang: false,
        makanSiang: false,
        snackSore: false,
    });
    const [nominal, setNominal] = useState(0);

    const handleUnitChange = (e) => {
        const unitId = e.target.value;
        setSelectedUnit(unitId);
        setSelectedRoom("");
        setCapacity("");

        const unit = units.find((u) => u.value == unitId);
        setRooms(
            unit
                ? unit.meeting_rooms.map((r) => ({
                      value: r.value,
                      label: r.label,
                      capacity: r.capacity,
                  }))
                : []
        );
    };

    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        setSelectedRoom(roomId);

        const room = rooms.find((r) => r.value == roomId);
        setCapacity(room ? room.capacity : "");
    };

    useEffect(() => {
        if (!startTime || !endTime) return;

        const start = toMinutes(startTime);
        const end = toMinutes(endTime);

        let newConsumptions = {
            snackSiang: false,
            makanSiang: false,
            snackSore: false,
        };

        // Rule 1: sebelum jam 11.00 (660 menit) → snack siang
        if (start < 660 || end <= 660 || (start < 660 && end > 660)) {
            newConsumptions.snackSiang = true;
        }

        // Rule 2: antara 11.00 - 14.00 (660 - 840 menit) → makan siang
        if (
            start < 840 &&
            end > 660 // overlap sama range 11-14
        ) {
            newConsumptions.makanSiang = true;
        }

        // Rule 3: setelah 14.00 (840 menit) → snack sore
        if (end > 840 || start >= 840) {
            newConsumptions.snackSore = true;
        }

        setConsumptions(newConsumptions);
    }, [startTime, endTime]);

    useEffect(() => {
        if (!participants) {
            setNominal(0);
            return;
        }

        let totalPerPeserta = 0;

        Object.entries(consumptions).forEach(([key, active]) => {
            if (active) {
                totalPerPeserta += HARGA[key] || 0;
            }
        });

        setNominal(participants * totalPerPeserta);
    }, [participants, consumptions]);

    return (
        <Layout>
            <Head title="Pesan Ruangan" />
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
            {message && (
                <div className="mb-4 p-4 text-white bg-green-500 rounded-lg">
                    {message}
                </div>
            )}
            <Card>
                <Form action="/bookings" method="POST" className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <h2 className="font-semibold text-md text-dark">
                                Informasi Ruang Meeting
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                <FormSelect
                                    label="Unit"
                                    options={units}
                                    error={errors.unit_id}
                                    value={selectedUnit}
                                    onChange={handleUnitChange}
                                    name="unit_id"
                                />
                                <FormSelect
                                    label="Ruang Meeting"
                                    options={rooms}
                                    error={errors.meeting_room_id}
                                    value={selectedRoom}
                                    onChange={handleRoomChange}
                                    name="meeting_room_id"
                                    disabled={!selectedUnit}
                                />
                                <div className="hidden col-span-2 md:block"></div>
                                <FormInput
                                    label="Kapasitas"
                                    type="number"
                                    value={capacity}
                                    name="capacity"
                                    disabled
                                />
                            </div>

                            <hr className="my-9 text-light" />

                            <h2 className="font-semibold text-md text-dark">
                                Informasi Rapat
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                <FormInput
                                    label="Tanggal Rapat"
                                    type="date"
                                    error={errors.meeting_date}
                                    name="meeting_date"
                                />
                                <FormSelect
                                    label="Waktu Mulai"
                                    options={hours}
                                    error={errors.start_time}
                                    name="start_time"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                />
                                <FormSelect
                                    label="Waktu Selesai"
                                    options={hours}
                                    error={errors.end_time}
                                    name="end_time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                                <div className="hidden md:block"></div>
                                <FormInput
                                    label="Jumlah Peserta"
                                    type="text"
                                    placeholder="Masukan Jumlah Peserta"
                                    name="participants"
                                    error={errors.participants}
                                    value={participants}
                                    onChange={(e) =>
                                        setParticipants(Number(e.target.value))
                                    }
                                />
                                <div className="hidden col-span-3 md:block"></div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold text-dark">
                                        Jenis Konsumsi
                                    </span>
                                    <FormCheckbox
                                        label="Snack Siang"
                                        checked={consumptions.snackSiang}
                                        readOnly
                                    />
                                    <FormCheckbox
                                        label="Makan Siang"
                                        checked={consumptions.makanSiang}
                                        readOnly
                                    />
                                    <FormCheckbox
                                        label="Snack Sore"
                                        checked={consumptions.snackSore}
                                        readOnly
                                    />
                                </div>
                                <div className="hidden col-span-3 md:block"></div>
                                <FormInput
                                    label="Nominal Konsumsi"
                                    type="number"
                                    prefix="Rp."
                                    placeholder="0"
                                    value={nominal.toLocaleString("id-ID")}
                                    readOnly
                                />
                            </div>

                            <hr className="my-9 text-light" />

                            <div className="flex justify-end gap-3 mt-4">
                                <Button
                                    href="/bookings"
                                    className="bg-transparent hover:bg-transparent !text-[#FF6363] hover:!text-red-700"
                                >
                                    Batal
                                </Button>
                                <Button disabled={processing}>Simpan</Button>
                            </div>
                        </>
                    )}
                </Form>
            </Card>
        </Layout>
    );
}

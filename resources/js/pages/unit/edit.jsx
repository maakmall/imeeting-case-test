import { useForm, Head, Form } from "@inertiajs/react";
import Layout from "../../layouts/main";

export default function Edit({ unit }) {
    const { data, setData, processing, errors } = useForm({
        name: unit.name || "",
        meeting_rooms: unit.meeting_rooms || [],
    });

    const addMeetingRoom = () => {
        setData("meeting_rooms", [
            ...data.meeting_rooms,
            { name: "", capacity: "" },
        ]);
    };

    const removeMeetingRoom = (index) => {
        setData(
            "meeting_rooms",
            data.meeting_rooms.filter((_, i) => i !== index)
        );
    };

    return (
        <Layout>
            <Head title="Edit Unit" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Edit Unit</h1>
            </div>

            <Form
                action={`/units/${unit.id}`}
                method="PUT"
                className="space-y-6"
            >
                {/* Nama Unit */}
                <div>
                    <label className="block mb-1 font-medium">Nama Unit</label>
                    <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Meeting Rooms */}
                <div>
                    <label className="block mb-2 font-medium">
                        Ruang Rapat
                    </label>
                    {data.meeting_rooms.map((room, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 mb-3"
                        >
                            <input
                                type="text"
                                placeholder="Nama Ruang"
                                value={room.name}
                                name={`meeting_rooms[${index}][name]`}
                                onChange={(e) =>
                                    setData(
                                        "meeting_rooms",
                                        data.meeting_rooms.map((r, i) =>
                                            i === index
                                                ? { ...r, name: e.target.value }
                                                : r
                                        )
                                    )
                                }
                                className="flex-1 border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Kapasitas"
                                value={room.capacity}
                                name={`meeting_rooms[${index}][capacity]`}
                                onChange={(e) =>
                                    setData(
                                        "meeting_rooms",
                                        data.meeting_rooms.map((r, i) =>
                                            i === index
                                                ? {
                                                      ...r,
                                                      capacity: e.target.value,
                                                  }
                                                : r
                                        )
                                    )
                                }
                                className="w-32 border rounded p-2"
                            />
                            <button
                                type="button"
                                onClick={() => removeMeetingRoom(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMeetingRoom}
                        className="text-blue-600 mt-2"
                    >
                        + Tambah Ruang
                    </button>
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </Form>
        </Layout>
    );
}

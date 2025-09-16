import { Form, useForm, Head } from "@inertiajs/react";
import Layout from "../../layouts/main";
import Button from "../../components/button";
import { ChevronLeft } from "lucide-react";
import Breadcrumbs from "../../components/breadcrumbs";
import { FormInput } from "../../components/form-input";

const breadcrumbs = [
    { label: "Daftar Unit", href: "/units" },
    { label: "Tambah Unit" },
];

export default function Create() {
    const { data, setData } = useForm({
        name: "",
        meeting_rooms: [],
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
            <Head title="Tambah Unit" />
            <div className="flex items-start gap-4 mb-8">
                <Button href="/units" className="!p-3">
                    <ChevronLeft className="text-white size-4" />
                </Button>
                <div>
                    <h1 className="text-[28px] font-bold text-dark">Unit</h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>

            <Form action="/units" method="POST" className="space-y-6">
                {({ processing, errors }) => (
                    <>
                        <FormInput
                            label="Nama Unit"
                            error={errors.name}
                            name="name"
                        />
                        <label className="block mb-2 font-medium">
                            Ruang Rapat
                        </label>

                        {data.meeting_rooms.map((room, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 mb-3"
                            >
                                <FormInput
                                    label="Nama Ruang"
                                    error={errors[`meeting_rooms.${index}.name`]}
                                    name={`meeting_rooms[${index}][name]`}
                                    value={room.name}
                                    onChange={(e) =>
                                        setData(
                                            "meeting_rooms",
                                            data.meeting_rooms.map((r, i) =>
                                                i === index
                                                    ? {
                                                          ...r,
                                                          name: e.target.value,
                                                      }
                                                    : r
                                            )
                                        )
                                    }
                                />
                                <FormInput
                                    label="Kapasitas"
                                    error={errors[`meeting_rooms.${index}.capacity`]}
                                    name={`meeting_rooms[${index}][capacity]`}
                                    value={room.capacity}
                                    onChange={(e) =>
                                        setData(
                                            "meeting_rooms",
                                            data.meeting_rooms.map((r, i) =>
                                                i === index
                                                    ? {
                                                          ...r,
                                                          capacity:
                                                              e.target.value,
                                                      }
                                                    : r
                                            )
                                        )
                                    }
                                />
                                <div className="flex self-end">
                                    <Button
                                        onClick={() => removeMeetingRoom(index)}
                                        className="bg-red-500 hover:bg-red-700"
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <Button
                                onClick={addMeetingRoom}
                                type="button"
                                className="!bg-light !text-dark"
                            >
                                + Tambah Ruang
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </Layout>
    );
}

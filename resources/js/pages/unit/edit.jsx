import { useForm, Head, Form } from "@inertiajs/react";
import Layout from "../../layouts/main";
import Breadcrumbs from "../../components/breadcrumbs";
import Button from "../../components/button";
import { FormInput } from "../../components/form-input";
import { ChevronLeft } from "lucide-react";

const breadcrumbs = [
    { label: "Daftar Unit", href: "/units" },
    { label: "Edit Unit" },
];

export default function Edit({ unit }) {
    const { data, setData } = useForm({
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
            <div className="flex items-start gap-4 mb-8">
                <Button href="/units" className="!p-3">
                    <ChevronLeft className="text-white size-4" />
                </Button>
                <div>
                    <h1 className="text-[28px] font-bold text-dark">Unit</h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
            </div>

            <Form
                action={`/units/${unit.id}`}
                method="PUT"
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <FormInput
                            label="Nama Unit"
                            error={errors.name}
                            name="name"
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value)
                            }}
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
                                    error={
                                        errors[`meeting_rooms.${index}.name`]
                                    }
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
                                    error={
                                        errors[
                                            `meeting_rooms.${index}.capacity`
                                        ]
                                    }
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

import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UsedFeature } from "@/types/usedFeature";
import { Head } from "@inertiajs/react";

interface Props {
    usedFeatures: UsedFeature;
}

export default function Dashboard({ usedFeatures }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Feature
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Credits
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Additional Data
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usedFeatures.data.map((usedFeature) => (
                                        <tr
                                            key={usedFeature.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {usedFeature.feature.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {usedFeature.credits}
                                            </td>
                                            <td className="px-6 py-4">
                                                {usedFeature.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {JSON.stringify(
                                                    usedFeature.data
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {!usedFeatures.data.length && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center px-8"
                                            >
                                                you have not used any features
                                                yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination links={usedFeatures.meta.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

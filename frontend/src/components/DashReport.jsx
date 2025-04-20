import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function DashReport() {
    const [stations, setStations] = useState([]);
    const [oIds, setOIds] = useState([]);
    const [formData, setFormData] = useState({});
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchValues = async () => {
        await fetch("/api/v1/static/getstaticvalue/station")
            .then((res) => res.json())
            .then((data) => setStations(data));
    };

    const fetcOfficers = async () => {
        await fetch("/api/v1/user/getallofficers")
            .then((res) => res.json())
            .then((data) => setOIds(data));
    };

    useEffect(() => {
        fetchValues();
        fetcOfficers();
    }, []);

    const generatePDF = async () => {
        setIsLoading(true);
        try {
            // Convert filters to query string
            const queryParams = new URLSearchParams();
            for (const key in formData) {
                if (formData[key]) {
                    queryParams.append(key, formData[key]);
                }
            }

            // Make API request
            const response = await fetch(`/api/v1/fine/pdf?${queryParams.toString()}`);
            
            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            // Create blob URL for viewing
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!pdfUrl) return;
        
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'fines_report.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="min-h-screen p-4">
            <div className="lg:flex justify-around">
                <div className="min-w-60">
                    <div className="mb-2 block">
                        <Label htmlFor="officer">Officer ID</Label>
                    </div>
                    <Select 
                        id="officer" 
                        required 
                        onChange={(e) => setFormData({...formData, pId: e.target.value})} 
                        value={formData.pId || ""}
                    >
                        <option value="">Select Officer</option>
                        {oIds?.map((s, index) => (
                            <option value={s.id} key={index}>{s.id}</option>
                        ))}
                    </Select>
                </div>
                <div className="min-w-60">
                    <div className="mb-2 block">
                        <Label htmlFor="driver">Driver ID</Label>
                    </div>
                    <TextInput 
                        id="driver"
                        type="text" 
                        placeholder="Driver Id" 
                        value={formData.dId || ""}  
                        shadow 
                        onChange={(e) => setFormData({...formData, dId: e.target.value})}
                    />
                </div>
                <div className="min-w-60">
                    <div className="mb-2 block">
                        <Label htmlFor="vehicle">Vehicle No</Label>
                    </div>
                    <TextInput 
                        id="vehicle"
                        type="text" 
                        placeholder="Vehicle No" 
                        value={formData.vNo || ""}  
                        shadow 
                        onChange={(e) => setFormData({...formData, vNo: e.target.value})}
                    />
                </div>
            </div>
            <div className="lg:flex justify-around lg:mt-5">
                <div className="min-w-60">
                    <div className="mb-2 block">
                        <Label htmlFor="station">Police Station</Label>
                    </div>
                    <Select 
                        id="station" 
                        required 
                        onChange={(e) => setFormData({...formData, pStation: e.target.value})} 
                        value={formData.pStation || ""}
                    >
                        <option value="">Select Station</option>
                        {stations?.data?.value.map((s, index) => (
                            <option value={s.name} key={index}>{s.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="flex min-w-60 items-end gap-2">
                    <Button 
                        type="button" 
                        onClick={generatePDF}
                        disabled={isLoading}
                        isProcessing={isLoading}
                    >
                        {isLoading ? 'Generating...' : 'Generate Report'}
                    </Button>
                    {pdfUrl && (
                        <Button 
                            type="button" 
                            color="success"
                            onClick={downloadPDF}
                        >
                            Download PDF
                        </Button>
                    )}
                </div>
                <div className="min-w-60"></div>
            </div>

            {/* PDF Viewer Section */}
            {pdfUrl && (
                <div className="mt-8 border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-2 flex justify-between items-center">
                        <span className="font-medium">Report Preview</span>
                        <Button size="xs" onClick={() => window.open(pdfUrl, '_blank')}>
                            Open in New Tab
                        </Button>
                    </div>
                    <iframe 
                        src={pdfUrl} 
                        className="w-full h-[600px] border-0"
                        title="Fine Report PDF"
                    />
                </div>
            )}
        </div>
    )
}
import { useState } from "react";
import { OtpInput } from 'reactjs-otp-input';
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { verifyCode } from "../services/authApi";
import { toast } from 'react-toastify';
import Toast from "../components/Toast";

function OtpVerification({ email }: { email: string }) {
    const [code, setCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async (code: string) => {
        try {
            const response = await verifyCode(email, code);
            if (response.status === 200) {
                setIsVerified(true);
            } else {
                toast.error("Please enter a valid verification code");
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            toast.error("Please enter a valid verification code");
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <Toast />
            <div className="flex items-center justify-center mx-auto flex-col md:flex-row md:items-center max-w-xl w-auto p-6 rounded-lg shadow-md overflow-hidden">

                {isVerified ? (
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-center mb-4">Your account has been verified successfully!</h3>
                        <Button
                            onClick={() => navigate("/login")}
                            className="w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500"
                        >
                            LOGIN
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold text-center mb-4">Verify your email</h3>
                        <p className="text-center mb-6">Please enter the 8 digit code you have received on {email}</p>
                        <div className="flex justify-center mb-6">
                            <OtpInput
                                value={code}
                                onChange={(value) => setCode(value)}
                                numInputs={8}
                                isInputNum
                                inputStyle={{
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    margin: "0 0.50rem",
                                    fontSize: "1rem",
                                    textAlign: "center",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.375rem",
                                }}
                                containerStyle={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "0.20rem",
                                    maxWidth: "100%",
                                }}
                            />
                        </div>
                        <Button
                            onClick={() => handleVerify(code)}
                            disabled={code.length !== 8}
                            className="w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500"
                        >
                            VERIFY
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OtpVerification;
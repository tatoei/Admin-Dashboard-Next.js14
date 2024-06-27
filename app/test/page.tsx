const Page = () => {
    const handleForm = async ({ formData }: any) => {
        "use server";
        console.log(formData)
        const username = formData.get("username") as string;
        console.log("Hello", username);
    };

    return (
        <div>
            <form onSubmit={handleForm}> {/*จะทำให้เมื่อกดปุ่มส่งแบบฟอร์มจะเรียกฟังก์ชัน handleForm ทันทีโดยไม่ต้องรีโหลดหน้าเว็บ*/}
                <input type="text" name="username" />
                <button>Send</button>
            </form>
        </div>
    );
};

export default Page;
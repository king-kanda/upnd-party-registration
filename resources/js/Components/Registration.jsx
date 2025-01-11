import React from "react";
import { useForm, Head } from '@inertiajs/react';

const Registration = () => {
  const { data, setData, post, processing, errors } = useForm({
    id: "",
    surname: "",
    otherNames: "",
    phone: "",
    dob: "",
    email: "",
    gender: "",
    leader: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setData({ ...data, photo: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('members.store'), {
      preserveScroll: true,
      onSuccess: () => {
        alert('Registration successful!');
      },
    });
  };

  return (
    <>
      <section className="mt-6 mx-16 border border-gray-200 shadow-sm rounded-md p-4 px-6">
        <form onSubmit={handleSubmit}>
          <div className="personal-details">
            <h3 className="text-xl font-bold">Personal Details</h3>
            <div className="form-control">
              <div className="photo-instructions my-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text">
                    <h4 className="font-bold underline">Upload Photo</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-900 mt-2">
                      <li className="text-sm">The photographs must not be older than six months</li>
                      <li className="text-sm">The photographs must have a white background</li>
                      <li className="text-sm">
                        Must face the camera directly, with both ears visible
                      </li>
                      <li className="text-sm">Photo size must not exceed 1 MB</li>
                    </ol>
                    <div className="photo-input mt-4">
                      <label
                        htmlFor="photo-upload"
                        className={`flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-md cursor-pointer ${
                          errors.photo
                            ? "border-red-500 hover:border-red-400"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <span className="text-gray-500">Select Photo</span>
                        <input
                          id="photo-upload"
                          name="photo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </label>
                      {errors.photo && (
                        <p className="mt-2 text-sm text-red-500">{errors.photo}</p>
                      )}
                    </div>
                  </div>
                  <div className="demo">
                    <h3 className="font-bold">Photo Examples</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src="https://app.uda.ke/assets/uda_frappe/grassroot/assets/sample.99753a44.png"
                        alt="sample image male"
                      />
                      <img
                        src="https://app.uda.ke/assets/uda_frappe/grassroot/assets/sample2.2a42563c.png"
                        alt="sample image female"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Personal Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Input Fields */}
                  {[
                    {
                      id: "id",
                      label: "ID/Passport",
                      type: "text",
                      placeholder: "ID/Passport No",
                      error: errors.id,
                    },
                    {
                      id: "surname",
                      label: "Surname",
                      type: "text",
                      placeholder: "e.g. Duckket",
                      error: errors.surname,
                    },
                    {
                      id: "otherNames",
                      label: "Other Names",
                      type: "text",
                      placeholder: "e.g. Jonh Doe",
                      error: errors.otherNames,
                    },
                    {
                      id: "phone",
                      label: "Phone Number",
                      type: "tel",
                      placeholder: "07XXXXXXXX",
                      error: errors.phone,
                    },
                    {
                      id: "dob",
                      label: "Date of Birth (YYYY-MM-DD)",
                      type: "date",
                      error: errors.dob,
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "example@email.com",
                      error: errors.email,
                    },
                  ].map((field) => (
                    <div key={field.id} className="flex flex-col">
                      <label htmlFor={field.id} className="font-medium">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder || ""}
                        value={data[field.id]}
                        onChange={handleChange}
                        className={`border rounded-md p-2 focus:outline-none focus:ring ${
                          field.error
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-gray-300"
                        }`}
                      />
                      {field.error && (
                        <span className="text-sm text-red-500">{field.error}</span>
                      )}
                    </div>
                  ))}

                  {/* Gender */}
                  <div className="flex flex-col">
                    <label htmlFor="gender" className="font-medium">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={data.gender}
                      onChange={handleChange}
                      className={`border rounded-md p-2 focus:outline-none focus:ring ${
                        errors.gender
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 focus:ring-gray-300"
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <span className="text-sm text-red-500">{errors.gender}</span>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {processing ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Registration;

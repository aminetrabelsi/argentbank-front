import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth, useProfile } from "/src/store/hooks";

import { ErrorText, InputText } from "/src/components";
import { observer } from "mobx-react-lite";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const EditForm = observer(({ handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const auth = useAuth();
  const profileStore = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profileStore.firstName,
      lastName: profileStore.lastName,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { firstName, lastName } = data;
    try {
      setLoading(true);
      setErrorMessage(null);

      await profileStore.updateProfile(auth.token, { firstName, lastName });
      setLoading(false);
      handleCancel();
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="sign-in-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          type="text"
          name="firstName"
          register={register}
          placeholder="FirstName"
          updateType="text"
          containerStyle="input-wrapper"
          labelTitle="FirstName"
        />
        <InputText
          type="text"
          name="lastName"
          register={register}
          placeholder="LastName"
          updateType="text"
          containerStyle="input-wrapper"
          labelTitle="LastName"
        />
        {errors.firstName && (
          <ErrorText styleClass="error-text">
            {errors.firstName.message}
          </ErrorText>
        )}
        {errors.lastName && (
          <ErrorText styleClass="error-text">
            {errors.lastName.message}
          </ErrorText>
        )}
        {errorMessage && (
          <ErrorText styleClass="error-text">{errorMessage}</ErrorText>
        )}
        {loading && <p>Loading...</p>}
        <button type="submit" className="sign-in-button">
          Save
        </button>
        <button className="sign-in-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
});

EditForm.propTypes = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditForm;

import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
        description: formState.description,
        url: formState.url
    }
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(event) =>
              setFormState({ ...formState, description: event.target.value })
            }
            type="text"
            placeholder="A desciption for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(event) =>
              setFormState({ ...formState, url: event.target.value })
            }
            type="text"
            placeholder="A URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;

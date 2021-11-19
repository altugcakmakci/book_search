import { gql } from '@apollo/client';

export const GET_ME = gql`
  query ($_id: String)) {
    me(_id: $_id) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation ($username: String, $password: String) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation ($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation ($_id: String, $authors: [String], $bookId: String, $title: String, $description: String, $image: String) {
    saveBook(_id: $_id, authors: $authors, bookId: $bookId, title: $title, description:$description, image: $image) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation ($_id: String, $bookId: String) {
    saveBook(_id: $id, bookId: $bookId) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
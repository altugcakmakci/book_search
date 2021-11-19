const { Book, User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, {body}) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }]  });

      if (!user) {
        throw new AuthenticationError('No prouserfile with this username found!');
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const matchup = await User.create(args);
      return matchup;
    },
    saveBook: async (parent, { userId, body }, context) => {
      if (context.user) {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return user;
    }
    // If user attempts to execute this mutation and isn't logged in, throw an error
    throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { user, params },context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id  },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );
        return user;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
      },
  },
};

module.exports = resolvers;

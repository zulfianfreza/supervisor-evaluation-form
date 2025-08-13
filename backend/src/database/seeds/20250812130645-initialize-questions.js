/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('questions', [
      {
        question_text: 'Management is capable and competent',
      },
      {
        question_text: 'Management clearly explains strategies and goals',
      },
      {
        question_text: 'Management positively motivates employees to achieve goals',
      },
      {
        question_text: 'Management has realistic performance expectations',
      },
      {
        question_text: 'Management takes responsibility for their actions',
      },
      {
        question_text: 'Management treats employees with respect',
      },
      {
        question_text: 'Management is accessible for questions and advice',
      },
      {
        question_text: 'Management follows company rules and policies',
      },
      {
        question_text: 'Management takes a personal interest in my success',
      },
      {
        question_text: 'I feel comfortable speaking with management',
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('questions', null, {});
  },
};

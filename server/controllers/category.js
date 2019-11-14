const db = require('../services/database');

exports.category_detail = async (req, res) => {
  const id = req.params.id;

  bcrypt.compare('reason9', '$2a$10$ImCB.CB7zXPcGZEzbAX1IuvSiK2kx7WJeJO7h0NHTF8UXc27mYsvS').then(result => {
    console.log(result);
  });

  const categories = await db
    .select('ID_TOC as value', 'HEADER_NAME as text')
    .from('PR_TOC')
    .where('ID_COMPANY', id)
    .orderBy('SEQ_ORDER');

  res.json({
    categories
  });
};

/* router.route('/todo').post(async (req, res) => {
  const {
    task
  } = req.body;
  const newTodo = await db('todo')
    .insert(task)
    .then(item => {
      return item.rowCount;
    });

  if (newTodo === 1) {
    return res.status(201).json({
      message: 'Todo created successfully'
    });
  }
}); */
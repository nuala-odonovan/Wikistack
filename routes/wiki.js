const express = require('express');
const router = express.Router();
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views/index');
const { Page, User } = require("../models");
const { where } = require('sequelize');

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    const user = await User.create({
      name: req.body.author,
      email: req.body.email,
    });
    await page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(main(pages));
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try{
  const page = await Page.findOne(
    {where: 
      {slug: req.params.slug}
    }
  )
  res.send(wikiPage(page));
} catch(error){
  next(error);
}
});

module.exports = router;

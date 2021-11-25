const app = require('express')();
const cors = require('cors');
const { Collection, Get, Documents, Paginate, Lambda } = require('faunadb');
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: 'fnAEYuSj4uAAQNKtiy4_0iz5JSYnHy1XiaQaGH--',
  domain: 'db.us.fauna.com',
});

app.use(cors());
app.get('/products', async (req, res) => {
  try {
    const doc = await client.query(
      q.Map(
        Paginate(Documents(Collection('products'))),
        Lambda((x) => Get(x))
      )
    );
    res.send(doc);
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log('API on http://localhost:4000')
);

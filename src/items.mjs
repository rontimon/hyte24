// mock data for simple API
const items = [
    {id: 1, name: 'Item yksi'},
    {id: 2, name: 'Item kaksi'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
  ];

const getItems = (req, res) => {
    res.json(items);
  };

const getItemById = (req, res) => {
    // TODO: palauta vain se objekti, jonka id vastaa pyydettyä, muuten 404
    // console.log('requested item id', req.params.id);
    const itemFound = items.find(item => item.id === req.params.id);
    };
    // console.log('found item ', itemFound);
    const resJson = itemFound ? itemFound : {error: 'not found'};
    if (itemFound) {
        res.json(itemFound);
    } else {
        res.status(404).json({error: 'not found'});
    }

    res.json(resJson);
};

const postItem = (req, res) => {
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
    res.json({message: 'item created'});
  };

const deleteItem = (req, res) => {
    // TODO: implement delete item
    // tip: array.findIndex() ?
    res.json({message: 'delete placeholder'})
};

const putItem = (req, res) => {
    // TODO: implement modify item
    res.json({message: 'delete placeholder'})
};

export {getItems, getItemById, postItem, deleteItem, putItem};

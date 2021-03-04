const News = require('../news/news');
const imageProcess = require('../util/imageProcess');


const news = new News();

const createNews = async (req, res) => {
const id = news.createId();
    try {
        const imageName = await imageProcess(req, id);
        news.create(req.body, id, imageName);
        res.json({success: true, message: 'Post created successfully.'});
    } catch (error) {
        res.json({success: false, message: 'Server error: Something went wrong.'});
        console.log('Error while creating news', error.message);
    }
};

const getAllNews = async (req, res) => {
    try {
        const data = await news.getAll();
        res.json({success: true, news: data})
    } catch (error) {
        res.json({success: false, message: 'Server error: Something went wrong.'});
        console.log('Error while getting all news', error.message);
    }
}

const getSingleNews = async (req, res) => {
    try {
        const data = await news.getSingle(req.params.id);
        if (!data) {
            return res.json({ success: false, message: 'Post not found!' });
        }
        return res.json({ success: true, news: data });
    } catch (error) {
        res.json({success: false, message: 'Server error: Something went wrong.'});
        console.log('Error while getting single news', error.message);
    }
}

const getNewsByCategory = async (req, res) => {
    try {
        const { category, qty } = req.params;
        const data = await news.getByCategory(category);
        if (!data) {
            return res.json({ success: false, message: 'Post not found!' });
        }
        if (qty) {
            return res.json({ success: true, news: [...data].splice(0, qty) });
        }
        return res.json({ success: true, news: data });

    } catch (error) {
        res.json({success: false, message: 'Server error: Something went wrong.'});
        console.log('Error while getting news by category', error.message);
    }
};

const searchPosts = async (req, res) => {
    try {
        const response = await news.searchPosts(req.params.query);
        if (response.length === 0) {
            return res.json({ success: false, message: 'No match found...' });
        }
        res.json({ success: true, news: response });
        
    } catch (error) {
        res.json({success: false, message: 'Server error: Something went wrong.'});
        console.log('Error while getting news by search post', error.message);
    }
};


module.exports = {
    createNews,
    getAllNews,
    getSingleNews,
    getNewsByCategory,
    searchPosts,
};


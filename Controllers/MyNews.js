const ArticleSchema = require('../Models/ArticleSchema');
const cloudinary = require('cloudinary').v2;


const getAllNews = async (req, res) => {
    try {
        const allNews = await ArticleSchema.find({}).sort({ publishedAt: -1 });
        res.status(200).json({ allNews });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the news' });
    }
}


const createNews = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.image;

    // Destructure all the required fields from the request body
    const { name, author, title, description, publishedAt, content } = req.body;

    // Validate that all required fields are provided
    if (!author || !title || !description || !publishedAt || !content) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'news_images',
        });

        // Save the image URL and all the other data to MongoDB
        const imageUrl = result.secure_url;
        const newArticle = new ArticleSchema({
            imageUrl,
            author,
            title,
            description,
            publishedAt: new Date(publishedAt),
            content,
        });
        await newArticle.save();

        res.status(201).send('File uploaded and data saved successfully.');
    } catch (err) {
        console.error('Error uploading file or saving to database', err);
        res.status(500).send('Internal server error');
    }
};

const getNews = async (req,res) => {
    const {id : newsID} = req.params
    const news = await ArticleSchema.findOne({_id:newsID})
    if(!news)
    {
        return res.status(404).json({msg :`No news found`});
    }
    res.status(200).json({ news })
}

const deleteNews = async(req,res) => {
    const {id : newsID} = req.params
    const news = await ArticleSchema.findOneAndDelete({ _id: newsID })
    if(!news)
        {
            return res.status(404).json({msg :`Successfully Deleted`});
        }
        res.status(200).json({ news })
}

const updateNews = async(req,res) => {
    const {id : newsID} = req.params
    const news = await ArticleSchema.findOneAndUpdate({ _id: newsID },req.body,{
        new: true,
        runValidators: true,
    })
    if(!news)
        {
            return res.status(404).json({msg :`No news found`});
        }
        res.status(200).json({ news })

}

module.exports = {
    getAllNews,
    createNews,
    getNews,
    updateNews,
    deleteNews
}
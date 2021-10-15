const asyncHandler = require('../middleware/async');
const Reference = require('../models/Reference');
const { checkLengthAndSend, getNamesFromData } = require('../helpers/helpers');

// @desc      Get all references
// @route     GET /api/v1/references
// @access    Public
exports.getAllReferences = asyncHandler(async (req, res, next) => {
    const references = await Reference.find().sort([['title', 1]]);

    checkLengthAndSend(res, references, next)
});

// @desc      Get all reference names
// @route     GET /api/v1/references/names
// @access    Public
exports.getAllReferenceTitles = asyncHandler(async (req, res, next) => {
    const references = await Reference.find().sort([['title', 1]]);

    const getTitlesAndSlugsFromData = (references) => {
      let titles = [];
      references.forEach(ref => {
        titles.push({
          title: ref.title,
          slug: ref.titleSlug
        })
      })
      return titles;
    };

    const titles = getTitlesAndSlugsFromData(references)
    
    checkLengthAndSend(res, titles, next)
});

// @desc      Get a single reference by keyword
// @route     GET /api/v1/references/:keyword
// @access    Public
exports.getSingleReference = asyncHandler(async (req, res, next) => {
    const reference = await Reference.find({ titleSlug: req.params.keyword });

    checkLengthAndSend(res, reference, next);
});

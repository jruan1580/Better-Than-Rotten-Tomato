using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using Moq;
using ReviewManagement.Domain.Interfaces;
using System.Threading.Tasks;
using ReviewManagement.Domain.Models;
using ReviewManagement.API.Controllers;
using ReviewManagement.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ReviewManagement.Testing.APITests
{
    [TestFixture]
    public class ReviewControllerTests
    {
        private Mock<IReviewService> _reviewService;

        [SetUp]
        public void Setup()
        {
            _reviewService = new Mock<IReviewService>();
        }

        [Test]
        public async Task Test_AddMovieReview_Success()
        {
            _reviewService.Setup(r => r.AddMovieReviewService(It.IsAny<MovieReviewModel>()))
                .Returns(Task.CompletedTask);
            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.AddMovieReview(new AddMovieReviewRequest() 
            { 
                Username = "Username",
                Rating = 5,
                Comment = "Sample comment",
                MovieId = 5
            });

            Assert.NotNull(response);
            Assert.AreEqual(201, ((StatusCodeResult)response).StatusCode);
        }

        [Test]
        public async Task Test_AddMovieReview_Fail_ArgumentException()
        {
            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.AddMovieReview(null);
            Assert.NotNull(response);
            Assert.AreEqual(400, ((StatusCodeResult)response).StatusCode);
        }

        [Test]
        public async Task Test_AddMovieReview_Fail_Exception()
        {
            _reviewService.Setup(r => r.AddMovieReviewService(It.IsAny<MovieReviewModel>()))
                .Throws<Exception>();
            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.AddMovieReview(new AddMovieReviewRequest()
            {
                Username = "Username",
                Rating = 5,
                Comment = "Sample comment",
                MovieId = 5
            });

            Assert.NotNull(response);
            Assert.AreEqual(500, ((ObjectResult)response).StatusCode);
        }

        [Test]
        public async Task Test_GetMovieReviews_Success()
        {
            _reviewService.Setup(r => r.GetMovieReviewsByMovieIdService(It.IsAny<long>(), It.IsAny<int>()))
                .ReturnsAsync(new List<MovieReviewModel>());

            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.GetMovieReviews(1, 2);

            Assert.NotNull(response);
            Assert.AreEqual(200, ((OkObjectResult)response).StatusCode);
        }

        [Test]
        public async Task Test_GetMovieReviews_Fail_ArgumentException()
        {
            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.GetMovieReviews(-1, 0);

            Assert.NotNull(response);
            Assert.AreEqual(400, ((StatusCodeResult)response).StatusCode);
        }

        [Test]
        public async Task Test_GetMovieReviews_Fail_Exception()
        {
            _reviewService.Setup(r => r.GetMovieReviewsByMovieIdService(It.IsAny<long>(), It.IsAny<int>()))
                .Throws<Exception>();

            var controller = new ReviewController(_reviewService.Object);
            var response = await controller.GetMovieReviews(1, 0);

            Assert.NotNull(response);
            Assert.AreEqual(500, ((ObjectResult)response).StatusCode);
        }
    }
}

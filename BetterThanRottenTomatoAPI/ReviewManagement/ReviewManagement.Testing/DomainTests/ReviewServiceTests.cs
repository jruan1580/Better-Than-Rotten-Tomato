using Moq;
using NUnit.Framework;
using ReviewManagement.Domain.Services;
using ReviewManagement.Infrastructure.Repositories.Entities;
using ReviewManagement.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReviewManagement.Testing.DomainTests
{
    [TestFixture]
    public class ReviewServiceTests
    {
        private Mock<IReviewRepository> _reviewRepo;

        [SetUp]
        public void Setup()
        {
            _reviewRepo = new Mock<IReviewRepository>();
        }

        [Test]
        public async Task Test_AddMovieReviewService_Success()
        {
            _reviewRepo.Setup(r => r.AddMovieReview(It.IsAny<ReviewEntity>()))
                .Returns(Task.CompletedTask);
            var reviewService = new ReviewService(_reviewRepo.Object);
            await reviewService.AddMovieReviewService(new Domain.Models.MovieReviewModel {
                MovieId = 5,
                Comment = "This is a sample comment",
                Rating = 5,
                Username = "Username"
            });
            _reviewRepo.Verify(r => r.AddMovieReview(It.IsAny<ReviewEntity>()), Times.Once);

        }
        [Test]
        public void Test_AddMovieReview_Fail_ArgumentException()
        {
            var reviewService = new ReviewService(_reviewRepo.Object);
            Assert.ThrowsAsync<ArgumentException>(() => reviewService.AddMovieReviewService(null));

            _reviewRepo.Verify(r => r.AddMovieReview(It.IsAny<ReviewEntity>()), Times.Never);
        }

        [Test]
        public async Task Test_GetMovieReviewsByMovieId_Success()
        {
            _reviewRepo.Setup(r => r.GetMovieReviewsByMovieId(It.IsAny<long>(), It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(new List<ReviewEntity>());

            var reviewService = new ReviewService(_reviewRepo.Object);
            await reviewService.GetMovieReviewsByMovieIdService(1, 2);

            _reviewRepo.Verify(r => r.GetMovieReviewsByMovieId(It.IsAny<long>(), It.IsAny<int>(), It.IsAny<int>()), Times.Once);
        }

        [Test]
        public void Test_GetMovieReviewsByMovieId_Fail_ArgumentException()
        {
            var reviewService = new ReviewService(_reviewRepo.Object);
            Assert.ThrowsAsync<ArgumentException>(() => reviewService.GetMovieReviewsByMovieIdService(0, 1));
            _reviewRepo.Verify(r => r.GetMovieReviewsByMovieId(It.IsAny<long>(), It.IsAny<int>(), It.IsAny<int>()), Times.Never);
        }

    }
}

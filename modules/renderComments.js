import { comments } from './comments.js'

export const renderComments = () => {
    const list = document.querySelector('.comments')
    list.innerHTML = comments
        .map((comment, index) => {
            return ` 
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comments">
            ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>`
        })
        .join('')
    const likeButtons = document.querySelectorAll('.like-button')

    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            likeButton.classList.add('-loading-like')

            const index = likeButton.dataset.index
            const comment = comments[index]

            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1
                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = false
                renderComments()
                likeButton.classList.remove('-loading-like')
            })
        })
    }
}

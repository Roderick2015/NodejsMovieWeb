$(function() {
	$('.comment').click(function(e) {
		var target = $(this)
		var toId =target.data('tid')
		var commentId = target.data('cid')

		$('<input>').attr({
			type: 'hidden',
			name: 'comment[tid]',
			value: toId
		}).appendTo('#commentForm')
		var tr = $('.item-id-' + id)

		$('<input>').attr({
			type: 'hidden',
			name: 'comment[cid]',
			value: commentId
		}).appendTo('#commentForm')
		var tr = $('.item-id-' + id)
	})
})
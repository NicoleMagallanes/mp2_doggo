(function() {
  window.Spaces = {};

  Spaces.AddToCart = function(product_id) {
    var post;
    post = {
      id: product_id
    };
    $('#chec-basket').addClass('productAdded');
    $('#chec-basket').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      return $('#chec-basket').removeClass('productAdded');
    });
    return CommercejsSpace.cart.add(post).then(function(data) {
      Spaces.cartUpdate(data.cart);
      return hideProductDetailsModal();
    });
  };

  Spaces.removeItem = function(id) {
    return CommercejsSpace.cart.remove(id).then(function(data) {
      return Spaces.cartUpdate(data.cart);
    });
  };

  Spaces.quantity = function(id, amount) {
    var post;
    post = {
      quantity: amount
    };
    return CommercejsSpace.cart.update(id, post).then(function(data) {
      return Spaces.cartUpdate(data.cart);
    });
  };

  Spaces.cartUpdate = function(data) {
    $('#cart-overview ul.line-items').html('');
    if (!$.isEmptyObject(data.line_items)) {
      $('#cart-overview ul.line-items').html('');
      $.each(data.line_items, function(k, item) {
        var line_item_html;
        line_item_html = `<li><span class="line-item-name">${item.name}</span> <span class="line-item-quantity-alt"><input type="text" onblur="Spaces.quantity('${item.id}', $(this).val())" value="${item.quantity}"></span> <span class="line-item-price">${item.line_total.formatted_with_symbol}</span> <span onclick="Spaces.removeItem('${item.id}');  $(this).attr('onclick', '')" class="line-item-remove">✕</span> <span class="line-item-variants"></span> </li>`;
        return $('#cart-overview ul.line-items').append(line_item_html);
      });
    } else {
      $('#cart-overview ul.line-items').html('<li class="empty">Cart is empty!</li>');
    }
    $('#cart-overview .subtotal span').html(`${data.subtotal.formatted_with_symbol} <i>${data.currency.code}</i>`);
    $('#chec-basket span[data-chec="cart-items"]').html(`${data.total_items} Items`);
    return $('#chec-basket span[data-chec="cart-subtotal"]').html(`${data.subtotal.formatted_with_symbol}`);
  };

  Spaces.goToCheckout = function() {
    return CommercejsSpace.cart.retrieve().then(function(resp) {
      return window.location.href = resp.hosted_checkout_url + '?return_url=' + window.location.href;
    });
  };

  window.SpacesEditor = {};

  window.getCookie = function(name) {
    var match;
    match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) {
      return match[1];
    }
  };

  SpacesEditor.save = function(payload, callback) {
    var base_url, url;
    base_url = window.location.hostname === 'spaces.chec.local' ? 'https://merchant.chec.local' : 'https://merchant.chec.io';
    url = base_url + '/editorListener?signature=' + getCookie('merchant_signature');
    return $.post(url, payload, function(resp) {
      return callback(resp);
    });
  };

  SpacesEditor.changeOrder = function(event) {
    if (event === 'start') {
      window.sortableCache = $("#products").html();
      $("#products").addClass('editorSort');
      $('.editor.sort-products').show();
      $("#products").sortable();
      return $("#products").disableSelection();
    } else {
      $("#products").removeClass('editorSort');
      $('.editor.sort-products').hide();
      $("#products").sortable('destroy');
      $("#products").enableSelection();
      if (event === 'close') {
        return $("#products").html(window.sortableCache);
      }
    }
  };

  SpacesEditor.changeOrderSave = function() {
    var payload;
    payload = {
      'action': 'changeProductOrder',
      'data': $("#products").sortable('toArray', {
        attribute: 'data-product-id'
      })
    };
    return SpacesEditor.save(payload, function(resp) {
      resp = JSON.parse(resp);
      if (resp.success === true) {
        return SpacesEditor.changeOrder('saved');
      } else {
        return alert('Sorry, there was an error. Please try again.');
      }
    });
  };

}).call(this);

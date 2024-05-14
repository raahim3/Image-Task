$(document).ready(function(){

    
    $(document).on('change','input[name="screen_size"]',function(){
        $('.view_labels').removeClass('active');
        $(this).parent().find('.view_labels').addClass('active');
        $('.upload_content').hide();

        $($(this).data('content')).fadeIn();
    });

    $(document).on('change','#mobile_upload_input',function(){
        $('#mobile_preview').addClass('active');
        $('.upload_label_main').hide();
        var html = "<div class='tools'><div class='d-flex'><i class='append_square'></i><i class='append_circle'></i><i class='append_pointer'></i></div> <div class='save_and_remove'><i class='save_mark'></i><i class='delete_mark'></i></div></div>"
        html += '<img src="'+URL.createObjectURL(event.target.files[0])+'" alt=""  width="100%" height="100%" class="mobile_uploaded_image">';
        $('#mobile_preview').html(html);
    });

    $(document).on('change','#desk_upload_input',function(){
        $('#desk_preview').addClass('active');
        $('.upload_label_main_2').hide();
        var html = "<div class='tools'><div class='d-flex'><i class='append_square_desk'></i><i class='append_circle_desk'></i><i class='append_pointer_desk'></i></div> <div class='save_and_remove_desk'><i class='save_mark_desk'></i><i class='delete_mark_desk'></i></div></div>"
        html += '<img src="'+URL.createObjectURL(event.target.files[0])+'" alt=""  width="100%" height="100%" class="desk_uploaded_image">';
        $('#desk_preview').html(html);
    });
    var top = 0;
    var left = 0;
    var height = 0;
    var width = 0;
    var color = 'red';
    $(document).on('click','.open_create_task',function(){
        
        left = $(this).parent().css('left').replace('px','') ;
        top = $(this).parent().css('top').replace('px','') ;
        height = $(this).parent().css('height').replace('px','');
        width = $(this).parent().css('width').replace('px','');
        $('#create_task').removeClass('d-none').css({
            'display':'block',
            'top':Number(top)+Number(height)+71+'px',
            'left':left+'px',
        });
    })
    $(document).on('click','.mobile_uploaded_image',function(){
        $('#create_task').addClass('d-none');
    })
    $(document).on('click','.create_task_btn',function(){
        $('input[name="task_color"]:checked').each(function(){
            color = $(this).val();
        });
    })
    $(document).on('click','.create_task_btn_desk',function(){
        $('input[name="task_color_desk"]:checked').each(function(){
            color = $(this).val();
        });
    })
    $(document).on('click','.open_create_task_desk',function(){
        left = $(this).parent().css('left').replace('px','') ;
        top = $(this).parent().css('top').replace('px','') ;
        height = $(this).parent().css('height').replace('px','');
        width = $(this).parent().css('width').replace('px','');
        $('#create_task_desk').removeClass('d-none').css({
            'display':'block',
            'top':Number(top)+Number(height)+71+'px',
            'left':left+'px',
        });
    })
    $(document).on('click','.desk_uploaded_image',function(){
        $('#create_task_desk').addClass('d-none');
    })

    $(document).on('change','input[name="task_color"]',function(){
        $('.color_label').removeClass('active');
        $(this).parent().find('.color_label').addClass('active');
    });
    $(document).on('change','input[name="task_color_desk"]',function(){
        $('.color_label').removeClass('active');
        $(this).parent().find('.color_label').addClass('active');
    });

    $(document).on('click','.add_checkpoints',function(){
       var html = "";
       html += '<div class="d-flex mt-3">'; 
       html += '<div class="input-group m-0">'; 
       html += '<input type="text" class="form-control border_right_0" placeholder="Describe the checkpoints">'; 
       html += '<span class="input-group-text" id="basic-addon2"><i class="text_field_icon"></i></span>'; 
       html += '</div>'; 
       html += '<div class="remove_checkpoints">'; 
       html += '<a href="javascript:void(0);" class="text-danger"><i class="remove_checkpoint_icon"></i></a>'; 
       html += '</div>'; 
       html += '</div>';

       $('#append_checkpoints').prepend(html);
    });

    $(document).on('click','.remove_checkpoints',function(){
        $(this).parent().remove();
    });

                var count = 1;
            function makeDiv() {
                
                var numRand = Math.floor(Math.random() * 501);
                var divsize = 100;
                var mobilePreviewWidth = $('#mobile_preview').width();
                var mobilePreviewHeight = $('#mobile_preview').height();
                var posx = Math.floor(Math.random() * (mobilePreviewWidth - divsize));
                var posy = Math.floor(Math.random() * (mobilePreviewHeight - divsize));
                var centerX = width / 2 -10;
                var centerY = height / 2 -10;

                left = Number(left);
                top = Number(top);

                left += centerX;
                top += centerY;

                var or_left = (100 * left / mobilePreviewWidth);
                var or_top = (100 * top / mobilePreviewHeight);
                
                var $newdiv = $("<div class='issue_mark'  data-bs-toggle='modal' data-bs-target='#taskList'>"+ count++ +"</div>").css({
                    'position': 'absolute',
                    'left': or_left+'%', 
                    'top': or_top+'%',
                    'background-color':color,
                });
                
                $newdiv.appendTo('#mobile_preview', function () {
                    makeDiv();
                });
            }
    
    $(document).on('click', '#saveTask', function() {
        $('#createTask').modal('hide');
        makeDiv();
        $(this).off('click');
        $('#create_task').addClass('d-none');
        $('.drag_resize_square ,.drag_resize_circle ,.drag_resize_pointer').remove();
        $('#mobile_preview').removeClass('tool_active');
        // $('.save_and_remove').css('display','none');
    });

    $(document).on('click','.append_square',function(){
        if(!$('#mobile_preview').hasClass('tool_active')){
            $(this).parent().parent().append("<i class='drag_resize_square'><i class='open_create_task'></i></i>");
        }
        // $('.save_and_remove').css('display','flex ');
        $('#mobile_preview').addClass('tool_active');
    });
    $(document).on('click','.append_circle',function(){
        if(!$('#mobile_preview').hasClass('tool_active')){
            $(this).parent().parent().append("<i class='drag_resize_circle' ><i class='open_create_task'></i></i>");
        }
        // $('.save_and_remove').css('display','flex ');
        $('#mobile_preview').addClass('tool_active');
    });
    $(document).on('click','.append_pointer',function(){
        if(!$('#mobile_preview').hasClass('tool_active')){
            $(this).parent().parent().append("<i class='drag_resize_pointer'><i class='open_create_task pointer'></i></i>");
        }
        // $('.save_and_remove').css('display','flex ');
        $('#mobile_preview').addClass('tool_active');
    });
    $(document).on('mousedown', '.drag_resize_square', function() {
        $(this).draggable({
            containment: "#mobile_preview"
        }).resizable({
            containment: "#mobile_preview"
        });
    });
    $(document).on('mousedown', '.drag_resize_circle', function() {
        $(this).draggable({
            containment: "#mobile_preview"
        }).resizable({
            containment: "#mobile_preview"
        });
    });
    $(document).on('mousedown', '.drag_resize_pointer', function() {
        $(this).draggable({
            containment: "#mobile_preview"
        })
    });
    $(document).on('click','.delete_mark',function(){
        // $('#create_task').addClass('d-none');
        // $('.drag_resize_square ,.drag_resize_circle ,.drag_resize_pointer').remove();
        // $('#mobile_preview').removeClass('tool_active');
        // $('.save_and_remove').css('display','none');
         $('#mobile_preview').removeClass('active').html('');
         $('.upload_label_main').show();
        
    });
    $(document).on('click', '.hori_dots', function(event) {
        event.stopPropagation(); 
        var taskMenu = $(this).parent().find('.task_menu');
        $('.task_menu').not(taskMenu).addClass('d-none'); 
        taskMenu.toggleClass('d-none'); 
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.task_menu').length && !$(event.target).hasClass('hori_dots')) {
            $('.task_menu').addClass('d-none');
        }
    });



    // For Desk/Web



$(document).on('click','.append_square_desk',function(){
    if(!$('#desk_preview').hasClass('tool_active')){
        $(this).parent().parent().append("<i class='drag_resize_square_desk'><i class='open_create_task_desk'></i></i>");
    }
    $('.save_and_remove_desk').css('display','flex');
    $('#desk_preview').addClass('tool_active');
});
$(document).on('click','.append_circle_desk',function(){
    if(!$('#desk_preview').hasClass('tool_active')){
        $(this).parent().parent().append("<i class='drag_resize_circle_desk' ><i class='open_create_task_desk'></i></i>");
    }
    $('.save_and_remove_desk').css('display','flex');
    $('#desk_preview').addClass('tool_active');
});
$(document).on('click','.append_pointer_desk',function(){
    if(!$('#desk_preview').hasClass('tool_active')){
        $(this).parent().parent().append("<i class='drag_resize_pointer_desk'><i class='open_create_task_desk pointer'></i></i>");
    }
    $('.save_and_remove_desk').css('display','flex');
    $('#desk_preview').addClass('tool_active');
});
$(document).on('mousedown', '.drag_resize_square_desk', function() {
    $(this).draggable({
        containment: "#desk_preview"
    }).resizable({
        containment: "#desk_preview"
    });
});
$(document).on('mousedown', '.drag_resize_circle_desk', function() {
    $(this).draggable({
        containment: "#desk_preview"
    }).resizable({
        containment: "#desk_preview"
    });desk_preview
});
$(document).on('mousedown', '.drag_resize_pointer_desk', function() {
    $(this).draggable({
        containment: "#desk_preview"
    })
});
var countDesk = 1;
function makeDivDesk() {
    var numRand = Math.floor(Math.random() * 501);
    var mobilePreviewWidth = $('#desk_preview').width();
    var mobilePreviewHeight = $('#desk_preview').height();
    var centerX = width / 2 -10;
    var centerY = height / 2 -10;

    left = Number(left);
    top = Number(top);

    left += centerX;
    top += centerY;

    var or_left = (100 * left / mobilePreviewWidth);
    var or_top = (100 * top / mobilePreviewHeight);
    
    var $newdiv = $("<div class='issue_mark'  data-bs-toggle='modal' data-bs-target='#taskList'>"+ countDesk++ +"</div>").css({
        'position': 'absolute',
        'left': or_left + '%',
        'top': or_top + '%',
        'background-color':color,
    });
    
    $newdiv.appendTo('#desk_preview', function () {
        makeDivDesk();
    });
}
$(document).on('click', '#saveTaskDesk', function() {
    $('#createTaskDesk').modal('hide');
    makeDivDesk();
    $(this).off('click');
    $('#create_task_desk').addClass('d-none');
    $('.drag_resize_square_desk ,.drag_resize_circle_desk ,.drag_resize_pointer_desk').remove();
    $('#desk_preview').removeClass('tool_active');
    $('.save_and_remove_desk').css('display','none');
});
$(document).on('click','.delete_mark_desk',function(){
    // $('#create_create_task_deskask').addClass('d-none');
    // $('.drag_resize_square_desk ,.drag_resize_circle_desk ,.drag_resize_pointer_desk').remove();
    // $('#desk_preview').removeClass('tool_active');
    // $('.save_and_remove_desk').css('display','none');
     $('#desk_preview').removeClass('active').html('');
     $('.upload_label_main_2').show();
});
$(document).on('click','.add_checkpoints_desk',function(){
   var html = "";
   html += '<div class="d-flex mt-3">'; 
   html += '<div class="input-group m-0">'; 
   html += '<input type="text" class="form-control border_right_0" placeholder="Describe the checkpoints">'; 
   html += '<span class="input-group-text" id="basic-addon2"><i class="text_field_icon"></i></span>'; 
   html += '</div>'; 
   html += '<div class="remove_checkpoints_desk">'; 
   html += '<a href="javascript:void(0);" class="text-danger"><i class="remove_checkpoint_icon"></i></a>'; 
   html += '</div>'; 
   html += '</div>';

   $('#append_checkpoints_desk').prepend(html);
});

$(document).on('click','.remove_checkpoints_desk',function(){
    $(this).parent().remove();
});
    
});
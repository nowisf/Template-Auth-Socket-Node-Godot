extends Control
@onready var label_nombre_usuario = %NombreUsuarioLabel


func _ready() -> void:
	GlobalData.nombre_usuario_establecido.connect(establecer_label_usuario)

func establecer_label_usuario(nombre):
	label_nombre_usuario.text = nombre


func _on_boton_log_out_pressed() -> void:
	var socket_mensaje = {
		"type": "logout"
	}
	Socket.enviar_mensaje(socket_mensaje)

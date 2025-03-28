package com.itinfo.rutilvm.util.ssh.model

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.itinfo.rutilvm.util.ssh.util.SSHHelper
import com.itinfo.rutilvm.util.ssh.util.executeAll
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session
import org.slf4j.LoggerFactory
import java.io.Serializable
import java.util.*

private val log = LoggerFactory.getLogger(RemoteConnMgmt::class.java.canonicalName)

private val gson: Gson =
	GsonBuilder()
		.setPrettyPrinting()
		.create()

/**
 * [RemoteConnMgmt]
 * SSH 연결 유형
 *
 * @since 2025.02.20
 * @author chanhi2000
 */
open class RemoteConnMgmt(
	val host: String = "",
	val port: Int = 0,
	val id: String = "",
	val connectionTimeout: Int? = DEFAULT_CONNECTION_TIMEOUT,
	val prvKey: String? = null,
): Serializable {
	override fun toString(): String =
		gson.toJson(this)

	class Builder {
		private var bHost: String = "";fun host(block: () -> String?) { bHost = block() ?: "" }
		private var bPort: Int = 0;fun port(block: () -> Int?) { bPort = block() ?: 0 }
		private var bId: String = "";fun id(block: () -> String?) { bId = block() ?: "" }
		private var bConnectionTimeout: Int? = DEFAULT_CONNECTION_TIMEOUT;fun connectionTimeout(block: () -> Int?) { bConnectionTimeout = block() ?:DEFAULT_CONNECTION_TIMEOUT }
		private var bPrvKey: String? = null;fun prvKey(block: () -> String?) { bPrvKey = block() }
		fun build(): RemoteConnMgmt = RemoteConnMgmt(bHost, bPort, bId, bConnectionTimeout, bPrvKey)
	}

	companion object {
		const val DEFAULT_CONNECTION_TIMEOUT = 60000
		private const val DELIMITER_ADDRESS = ";"
		private val MATCHER_ADDRESS = "(?<=@)[^:]+(?=:)".toRegex()
		fun asRemoteConnMgmt(fullAddress: String, prvKey: String? = null, connectionTimeout: Int = DEFAULT_CONNECTION_TIMEOUT): RemoteConnMgmt {
			val id: String = fullAddress.split("@").first()
			val host: String = MATCHER_ADDRESS.find(fullAddress)?.value ?: ""
			val port: Int = fullAddress.split(DELIMITER_ADDRESS).last().toIntOrNull() ?: 22
			return builder {
				host { host }
				port { port }
				id { id }
				connectionTimeout { connectionTimeout }
				prvKey { prvKey }
			}
		}
		inline fun builder(block: Builder.() -> Unit): RemoteConnMgmt = Builder().apply(block).build()
	}
}

/**
 * [RemoteConnMgmt.enableGlobalHA]
 * SSH로 global HA 활성화
 *
 */
fun RemoteConnMgmt.enableGlobalHA(): Result<Boolean> = runCatching {
	log.info("enableGlobalHA ... ")
	val session: Session? = toInsecureSession()
	return session?.executeAll(listOf(SSHHelper.SSH_COMMAND_SET_MAINTENANCE_ACTIVE)) ?: throw Error("UNKNOWN ERROR!")
}.onSuccess {
	log.info("SSH '글로벌 HA 활성화' 성공: {}", it)
}.onFailure {
	log.error("SSH '글로벌 HA 활성화' 실패: {}", it.localizedMessage)
	// throw if (it is Error) it.toItCloudException() else it
	throw it
}

/**
 * [RemoteConnMgmt.rebootHostViaSSH]
 * SSH로 재시작
 */
fun RemoteConnMgmt.rebootSystem(): Result<Boolean> = runCatching {
	log.info("rebootSystem ... ")
	val session: Session? = toInsecureSession()
	return session?.executeAll(listOf(SSHHelper.SSH_COMMAND_RESTART)) ?: throw Error("UNKNOWN ERROR!")
}.onSuccess {
	log.info("SSH 재부팅 성공: {}", it)
}.onFailure {
	log.error("SSH 재부팅 실패: {}", it.localizedMessage)
	// throw if (it is Error) it.toItCloudException() else it
	throw it
}

fun RemoteConnMgmt.toInsecureSession(connectionTimeout: Int = 60000): Session? {
	log.debug("toInsecureSession... fullAddress: {}, prvKey: {}", "${id}@${host}:${port}", prvKey)
	val jsch = JSch()
	val session: Session? = jsch.getSession(id, host, port)
	jsch.addIdentity(UUID.randomUUID().toString(), prvKey?.toByteArray(), null, "".toByteArray())
	session?.setConfig(Properties().apply {
		put("StrictHostKeyChecking", "no")
		put("PreferredAuthentications", "publickey")
	})
	return session?.also {
		it.connect(connectionTimeout)
	}
}

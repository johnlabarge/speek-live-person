dataSource {
    pooled = true
    url = "jdbc:mysql://localhost/speeklp"
    driverClassName = "com.mysql.jdbc.Driver"
    dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"

}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = true
    cache.provider_class = 'net.sf.ehcache.hibernate.EhCacheProvider'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "create-drop" // one of 'create', 'create-drop','update'
            username = "root"
            password = ""
        }
    }
    test {
        dataSource {
            dbCreate = "update"
            username="speek"
            password="$peek"
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            username= "speek"
            password= "sp33k"

        }
    }
}